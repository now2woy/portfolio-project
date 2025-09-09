'use client'

import { useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { postKeys, fetchPosts } from '@/queries/PostQuery'
import { insertPostViaBff, updatePostViaBff, deletePostViaBff } from '@/services/client/PostClientService'

import { DefaultSearch } from '@/components/Searchs'
import { Grid } from '@/components/Grids'
import { ButtionArea } from '@/components/Buttons/ButtionArea'
import { FormViewer } from '@/components/Viewers/FormViewer'

import { ISearchData, ISearchField } from '@/types/components/SearchType'
import { IColumnConfig } from '@/types/ColumnDefType'
import { IFormFieldProps } from '@/types/components/ViewType'
import { IPostProps } from '@/types/apps/PostType'
import { ButtionAreaProps } from '@/types/components/ButtonType'
import { IBoardProps } from '@/types/apps/BoardType'
import { ICdProps } from '@/types/apps/CdGroupType'

/**
 * 게시물 메뉴 기본 URL
 */
const BASE_MENU_URL = '/posts'

/**
 * 목록 클라이언트 컴포넌트
 * @param param
 * @returns
 */
export const List = ({ brdId, initialData, fields, columnsConfig, codes }: { brdId: string; initialData: ISearchData; fields: ISearchField[]; columnsConfig: IColumnConfig[]; codes?: ICdProps[] }) => {
    const searchParams = useSearchParams()
    const query = searchParams?.toString() ?? ''

    // 캐싱된 데이터 사용
    const { data } = useQuery({
        queryKey: postKeys.lists(brdId, query),
        queryFn: fetchPosts
    })

    return (
        <>
            <DefaultSearch
                initialData={initialData}
                fields={fields}
                codes={codes}
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
export const Edit = ({ brdId, postId, data, board, codes }: { brdId: string; postId: string; data?: IPostProps; board: IBoardProps; codes?: ICdProps[] }) => {
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
    const formRef = useRef(null)
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

    // 게시글 입력 from 의 필드 정의
    const fields: IFormFieldProps<IPostProps>[] = [
        { label: '제목', key: 'postTtl', colSpan: 6, type: 'text', required: true, hasBorderTop: false },
        { label: '내용', key: 'postCtt', colSpan: 6, type: 'tiptap', required: true },
        { label: '첨부파일', key: 'files', colSpan: 6, type: 'file', isVisibility: board.atchFileYn === 'Y' },
        { label: '입력일시', key: 'insDt', colSpan: 3, type: 'viewer', dataType: 'date', format: 'YYYY/MM/DD HH:mm:SS' },
        { label: '수정일시', key: 'updDt', colSpan: 3, type: 'viewer', dataType: 'date', format: 'YYYY/MM/DD HH:mm:SS' }
    ]

    const buttons: ButtionAreaProps[] = [
        { name: '목록', type: 'link', align: 'left', isVisibility: true, variant: 'outline', url: `${BASE_MENU_URL}/${brdId}?${query}` },
        {
            name: '저장',
            type: 'mutation',
            align: 'right',
            isVisibility: isNew,
            className: 'text-white',
            mutationFn: insertPostViaBff,
            variables: { brdId, data: modifyData },
            queryKeyToInvalidate: ['posts'],
            confirmMessage: '저장하시겠습니까?',
            onSuccessCallback: handleCallback,
            files: modifyData.files,
            formRef
        },
        {
            name: '수정',
            type: 'mutation',
            align: 'right',
            isVisibility: !isNew,
            className: 'text-white',
            mutationFn: updatePostViaBff,
            variables: { brdId, postId, data: modifyData },
            queryKeyToInvalidate: ['posts'],
            confirmMessage: '수정하시겠습니까?',
            onSuccessCallback: handleCallback,
            files: modifyData.files,
            formRef
        }
    ]

    return (
        <form
            ref={formRef}
            onSubmit={e => e.preventDefault()}>
            <FormViewer<IPostProps>
                data={modifyData}
                fields={fields}
                codes={codes}
                onUpdate={setModifyData}
            />
            <ButtionArea buttons={buttons} />
        </form>
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
    const listUrl = `${BASE_MENU_URL}/${brdId}?${query}`

    // 정상, 오류 콜백
    const handleCallback = () => {
        // 목록 화면으로 이동
        router.push(listUrl)
    }
    const buttons: ButtionAreaProps[] = [
        { name: '목록', type: 'link', align: 'left', isVisibility: true, variant: 'outline', url: listUrl },
        { name: '수정', type: 'link', align: 'right', isVisibility: true, className: 'text-white', url: `${BASE_MENU_URL}/${brdId}/${postId}/edit?${query}` },
        {
            name: '삭제',
            type: 'mutation',
            align: 'right',
            isVisibility: true,
            className: 'text-white',
            mutationFn: deletePostViaBff,
            variables: { brdId, postId },
            queryKeyToInvalidate: ['posts'],
            confirmMessage: '삭제하시겠습니까?',
            onSuccessCallback: handleCallback
        }
    ]

    return <ButtionArea buttons={buttons} />
}
