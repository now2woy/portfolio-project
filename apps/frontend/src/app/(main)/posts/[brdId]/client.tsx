'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'
import { postKeys, fetchPosts } from '@/queries/PostQuery'
import { insertPostViaBff, updatePostViaBff, deletePostViaBff } from '@/services/client/PostClientService'

import { DefaultSearch } from '@/components/Searchs'
import { Grid } from '@/components/Grids'
import { LinkButton, MutationButton } from '@/components/Buttons'
import { FormViewer } from '@/components/Viewers/FormViewer'

import { formatDate } from '@/utils/DateUtils'

import { IPostProps } from '@/types/apps/PostType'
import { IColumnConfig } from '@/types/ColumnDefType'
import { ISearchData, ISearchField } from '@/types/components/SearchType'
import { IFormFieldProps } from '@/types/components/ViewType'

/**
 * TiptapEditor를 클라이언트 측에서 다이나믹 로드
 */
const TiptapEditor = dynamic(() => import('@/components/TipTaps').then(mod => mod.TiptapEditor), {
    ssr: false, // 서버 측 렌더링을 비활성화
    loading: () => null // 로딩 중 보여줄 컴포넌트
})

/**
 * 게시물 메뉴 기본 URL
 */
const BASE_MENU_URL = '/posts'

/**
 * 목록 클라이언트 컴포넌트
 * @param param
 * @returns
 */
export const List = ({ brdId, initialData, fields }: { brdId: string; initialData: ISearchData; fields: ISearchField[] }) => {
    const searchParams = useSearchParams()
    const query = searchParams?.toString() ?? ''

    // 캐싱된 데이터 사용
    const { data } = useQuery({
        queryKey: postKeys.lists(brdId, query),
        queryFn: fetchPosts
    })

    // 게시글 목록 컬럼 정의
    const columnsConfig: IColumnConfig[] = [
        { key: 'postId', label: '번호', type: 'text', size: 40, align: 'center' },
        { key: 'postTtl', label: '제목', type: 'link', linkBaseUrl: BASE_MENU_URL, linkKeys: ['brdId', 'postId'] },
        { key: 'writerId', label: '작성자ID', type: 'text', size: 100 },
        { key: 'delYn', label: '삭제여부', type: 'boolean', size: 70 },
        { key: 'insDt', label: '작성일시', type: 'date', size: 140 },
        { key: 'updDt', label: '수정일시', type: 'date', size: 140 },
        { type: 'actions', label: 'Actions', linkBaseUrl: BASE_MENU_URL, linkKeys: ['brdId', 'postId'], linkAddUrl: '/edit', menu: ['수정'], size: 60 }
    ]

    return (
        <>
            <DefaultSearch
                initialData={initialData}
                fields={fields}
            />
            {data && (
                <Grid
                    data={data}
                    columnsConfig={columnsConfig}
                    newUrl={`${BASE_MENU_URL}/${brdId}/new?${query}`}
                />
            )}
        </>
    )
}

/**
 * 게시글 신규/수정 클라이언트 컴포넌트
 * @param param
 * @returns
 */
export const Edit = ({ brdId, postId, data }: { brdId: string; postId: string; data?: IPostProps }) => {
    const [modifyData, setModifyData] = useState<IPostProps>(
        data || {
            brdId: brdId,
            postTtl: '',
            postCtt: '',
            viewCnt: 0,
            delYn: 'N',
            isAttachFiles: false,
            files: {
                attchFiles: [],
                uploadFiles: [],
                deleteFiles: []
            }
        }
    )

    const searchParams = useSearchParams()
    const router = useRouter()
    const query = new URLSearchParams(searchParams)

    // 신규 여부
    const isNew = data ? false : true

    // 정상, 오류 콜백
    const handleCallback = () => {
        // 신규 일 경우
        if (isNew) {
            // 목록 화면으로 이동
            router.push(`${BASE_MENU_URL}/${brdId}`)
        } else {
            // 상세 화면으로 이동
            router.push(`${BASE_MENU_URL}/${brdId}/${postId}?${query}`)
        }
    }

    return (
        <>
            <FormViewer<IPostProps>
                data={modifyData}
                fields={fields}
                onUpdate={setModifyData}
            />

            <div className="grid grid-cols-2 py-4">
                <div className="flex items-center space-x-2">
                    <LinkButton
                        name="목록"
                        variant="outline"
                        url={`/posts/${brdId}?${query}`}
                    />
                </div>
                <div className="flex items-center justify-end space-x-2">
                    {isNew && (
                        <MutationButton
                            className="text-white"
                            mutationFn={insertPostViaBff}
                            variables={{ brdId, data: modifyData }}
                            queryKeyToInvalidate={['posts']}
                            onSuccessCallback={handleCallback}
                            onErrorCallback={handleCallback}
                            files={modifyData.files}>
                            저장
                        </MutationButton>
                    )}
                    {!isNew && (
                        <MutationButton
                            className="text-white"
                            mutationFn={updatePostViaBff}
                            variables={{ brdId, postId, data: modifyData }}
                            queryKeyToInvalidate={['posts']}
                            onSuccessCallback={handleCallback}
                            onErrorCallback={handleCallback}
                            files={modifyData.files}>
                            수정
                        </MutationButton>
                    )}
                </div>
            </div>
        </>
    )
}

/**
 * 게시글 상세 클라이언트 컴포넌트
 * @param param
 * @returns
 */
export const View = ({ brdId, postId }: { brdId: string; postId: string }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const query = new URLSearchParams(searchParams)

    // 정상, 오류 콜백
    const handleCallback = () => {
        // 목록 화면으로 이동
        router.push(`${BASE_MENU_URL}/${brdId}?${query}`)
    }

    return (
        <div className="grid grid-cols-2 py-4">
            <div className="flex items-center space-x-2">
                <LinkButton
                    name="목록"
                    variant="outline"
                    url={`${BASE_MENU_URL}/${brdId}?${query}`}
                />
            </div>
            <div className="flex items-center justify-end space-x-2">
                <LinkButton
                    name="수정"
                    className="text-white"
                    url={`${BASE_MENU_URL}/${brdId}/${postId}/edit?${query}`}
                />
                <MutationButton
                    className="text-white"
                    mutationFn={deletePostViaBff}
                    variables={{ brdId, postId }}
                    queryKeyToInvalidate={['posts']}
                    onSuccessCallback={handleCallback}
                    onErrorCallback={handleCallback}>
                    삭제
                </MutationButton>
            </div>
        </div>
    )
}

const fields: IFormFieldProps<IPostProps>[] = [
    { label: '제목', key: 'postTtl', colSpan: 6, type: 'text', required: true, hasBorderTop: true },
    {
        label: '내용',
        key: 'postCtt',
        colSpan: 6,
        hasBorderTop: true,
        render: (value, item, onFieldChange) => (
            <TiptapEditor
                content={value as string}
                onUpdate={newValue => onFieldChange?.('postCtt', newValue)}
            />
        )
    },
    { label: '첨부파일', key: 'files', colSpan: 6, hasBorderTop: true, type: 'file' },
    { label: '입력일시', key: 'insDt', colSpan: 3, hasBorderTop: true, type: 'viewer', render: value => formatDate(value as string) },
    { label: '수정일시', key: 'updDt', colSpan: 3, hasBorderTop: true, type: 'viewer', render: value => formatDate(value as string) }
]
