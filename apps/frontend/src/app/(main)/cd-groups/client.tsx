'use client'

import { JSX, useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'

import { postKeys, fetchCdGroups } from '@/queries/CdGroupQuery'
import { insertCdGroupViaBff, updateCdGroupAndCdsViaBff, deleteCdGroupAndCdsViaBff } from '@/services/client/CdGroupClientService'
import { FormViewer } from '@/components/Viewers/FormViewer'

import { LinkButton, MutationButton } from '@/components/Buttons'
import { DefaultSearch } from '@/components/Searchs'
import { Grid } from '@/components/Grids'

import { ISearchData, ISearchField } from '@/types/components/SearchType'
import { IColumnConfig } from '@/types/ColumnDefType'
import { ICdGroupProps, ICdProps } from '@/types/apps/CdGroupType'
import { IFormFieldProps } from '@/types/components/ViewType'
import { IDndColumnProps, IDndTableProps } from '@/types/components/GridType'

/**
 * CD GROUP API 기본 URL
 */
const BASE_MENU_URL = '/cd-groups'

/**
 * TiptapEditor를 클라이언트 측에 다이나믹 로드
 */
const TiptapEditor = dynamic(() => import('@/components/TipTaps').then(mod => mod.TiptapEditor), {
    ssr: false, // 서버 측 렌더링을 비활성화
    loading: () => null // 로딩 중 보여줄 컴포넌트
})

/**
 * 드래그 & 드랍 테이블을 클라이언트 측에 다이나믹 로드
 */
export const DndTable = dynamic(() => import('@/components/Grids/DndTable').then(mod => mod.DndTable), {
    ssr: false
}) as <T extends Record<string, unknown>>(props: IDndTableProps<T>) => JSX.Element

/**
 * 목록 클라이언트 컴포넌트
 * @param param
 * @returns
 */
export const List = ({ initialData, fields, columnsConfig, codes }: { initialData: ISearchData; fields: ISearchField[]; columnsConfig: IColumnConfig[]; codes: ICdProps[] }) => {
    const searchParams = useSearchParams()
    const query = searchParams?.toString() ?? ''

    // 캐싱된 데이터 사용
    const { data } = useQuery({
        queryKey: postKeys.lists(query),
        queryFn: fetchCdGroups
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
                    newUrl={`${BASE_MENU_URL}/new?${query}`}
                />
            )}
        </>
    )
}

/**
 * 상세 클라이언트 컴포넌트
 * @param param
 * @returns
 */
export const View = ({ groupId }: { groupId: string }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const query = new URLSearchParams(searchParams)

    // 정상, 오류 콜백
    const handleCallback = () => {
        // 목록 화면으로 이동
        router.push(`${BASE_MENU_URL}/${groupId}?${query}`)
    }

    return (
        <div className="grid grid-cols-2 py-4">
            <div className="flex items-center space-x-2">
                <LinkButton
                    name="목록"
                    variant="outline"
                    url={`${BASE_MENU_URL}?${query}`}
                />
            </div>
            <div className="flex items-center justify-end space-x-2">
                <LinkButton
                    name="수정"
                    className="text-white"
                    url={`${BASE_MENU_URL}/${groupId}/edit?${query}`}
                />
                <MutationButton
                    className="text-white"
                    mutationFn={deleteCdGroupAndCdsViaBff}
                    variables={{ groupId }}
                    queryKeyToInvalidate={['posts']}
                    confirmMessage="삭제하시겠습니까?"
                    onSuccessCallback={handleCallback}>
                    삭제
                </MutationButton>
            </div>
        </div>
    )
}

/**
 * 신규/수정 클라이언트 컴포넌트
 * @param param
 * @returns
 */
export const Edit = ({ groupId, data, codes }: { groupId?: string; data?: ICdGroupProps; codes?: ICdProps[] }) => {
    const [modifyData, setModifyData] = useState<ICdGroupProps>(data || { groupId: groupId || '', groupNm: '', useYn: 'Y', fixedLtYn: 'N' })
    const [cds, setCds] = useState<ICdProps[]>(modifyData.cds || [])
    const formRef = useRef(null)
    const searchParams = useSearchParams()
    const router = useRouter()
    const query = new URLSearchParams(searchParams)
    const isNew = data ? false : true

    // cds 상태가 변경될 때마다 modifyData에 반영
    useEffect(() => {
        setModifyData(prevData => ({
            ...prevData,
            cds: cds
        }))
    }, [cds])

    // 정상, 오류 콜백
    const handleCallback = () => {
        // 신규 일 경우
        if (isNew) {
            // 목록 화면으로 이동
            router.push(`${BASE_MENU_URL}`)
        } else {
            // 상세 화면으로 이동
            router.push(`${BASE_MENU_URL}/${groupId}?${query}`)
        }
    }

    // FormViewer의 onUpdate 콜백 함수
    const handleFormUpdate = (updatedData: ICdGroupProps) => {
        setModifyData(updatedData)
    }

    // 드래그 변경 시
    const handleDragEnd = (newItems: ICdProps[]) => {
        const updatedItems = newItems.map((item, index) => ({
            ...item,
            sortOrdr: index + 1
        }))
        setCds(updatedItems)
    }

    // 셀 값 변경 시
    const handleCellUpdate = (id: string, key: keyof ICdProps, value: unknown) => {
        setCds(currentData => currentData?.map(item => (item.cdId === id ? { ...item, [key]: value } : item)))
    }

    // 행 추가 핸들러
    const handleAddRow = () => {
        const newRow: ICdProps = {
            groupId: groupId || '',
            cdId: '',
            cdNm: '',
            rm: '',
            sortOrdr: cds.length + 1,
            useYn: 'Y',
            isNew: true
        }
        setCds([...cds, newRow])
    }

    // 행 삭제 핸들러
    const handleRemoveRow = (id: string) => {
        setCds(currentData =>
            currentData
                .filter(item => item.cdId !== id)
                .map((item, index) => ({
                    ...item,
                    sortOrdr: index + 1
                }))
        )
    }

    return (
        <form
            ref={formRef}
            onSubmit={e => e.preventDefault()}>
            <FormViewer
                data={modifyData}
                fields={fields}
                codes={codes}
                onUpdate={handleFormUpdate}>
                {cds && (
                    <DndTable
                        data={cds}
                        columns={columns}
                        idKey="cdId"
                        title="코드 목록"
                        onDragEnd={handleDragEnd}
                        onUpdate={handleCellUpdate}
                        onAddRow={handleAddRow}
                        onRemoveRow={handleRemoveRow}
                    />
                )}
            </FormViewer>
            <div className="grid grid-cols-2 py-4">
                <div className="flex items-center space-x-2">
                    <LinkButton
                        name="목록"
                        variant="outline"
                        url={`${BASE_MENU_URL}?${query}`}
                    />
                </div>
                <div className="flex items-center justify-end space-x-2">
                    {isNew && (
                        <MutationButton
                            className="text-white"
                            mutationFn={insertCdGroupViaBff}
                            variables={{ data: modifyData }}
                            queryKeyToInvalidate={['cds']}
                            confirmMessage="저장하시겠습니까?"
                            onSuccessCallback={handleCallback}
                            formRef={formRef}>
                            저장
                        </MutationButton>
                    )}
                    {!isNew && (
                        <MutationButton
                            className="text-white"
                            mutationFn={updateCdGroupAndCdsViaBff}
                            variables={{ groupId: groupId ?? '', data: modifyData }}
                            queryKeyToInvalidate={['cds']}
                            confirmMessage="수정하시겠습니까?"
                            onSuccessCallback={handleCallback}
                            formRef={formRef}>
                            수정
                        </MutationButton>
                    )}
                </div>
            </div>
        </form>
    )
}

// 입력 / 수정 필드 레이아웃 정의
const fields: IFormFieldProps<ICdGroupProps>[] = [
    { key: 'groupId', label: '코드그룹ID', colSpan: 3, type: 'text', required: true, hasBorderTop: false },
    { key: 'groupNm', label: '코드그룹명', colSpan: 3, type: 'text', required: true, hasBorderTop: false },
    { key: 'dataTyCd', label: '데이터타입', colSpan: 3, type: 'text', required: true },
    { key: 'lt', label: '최대길이', colSpan: 3, type: 'text' },
    { key: 'dc', label: '설명', colSpan: 6, type: 'tiptap', required: true },
    { key: 'useYn', label: '사용여부', colSpan: 3, type: 'radio', required: true, options: { groupId: 'YN_CD' } },
    { key: 'fixedLtYn', label: '고정길이여부', colSpan: 3, type: 'radio', required: true, options: { groupId: 'YN_CD' } },
    { key: 'insDt', label: '입력일시', colSpan: 3, type: 'viewer', dataType: 'date', format: 'YYYY/MM/DD HH:mm:SS' },
    { key: 'updDt', label: '수정일시', colSpan: 3, type: 'viewer', dataType: 'date', format: 'YYYY/MM/DD HH:mm:SS' }
]

// 입력 / 수정 하위 코드 목록 컬럼 정의
const columns: IDndColumnProps<ICdProps>[] = [
    { key: 'dndHandler', label: '', className: 'w-[40px]' },
    { key: 'cdId', label: '코드', className: 'w-[100px]', inputType: 'readonly' },
    { key: 'cdNm', label: '코드명', className: 'w-[200px]', inputType: 'text' },
    { key: 'rm', label: '비고', inputType: 'text' },
    { key: 'sortOrdr', label: '정렬순서', className: 'text-left w-[100px]', isDndColumn: true },
    { key: 'useYn', label: '사용여부', className: 'text-left w-[100px]', inputType: 'select' },
    { key: 'minusButton', label: '', className: 'w-[40px]' }
]
