import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { postKeys, fetchPosts } from '@/queries/PostQuery'
import { getBoard } from '@/services/server/BoardServerService'
import { ISearchData, ISearchField } from '@/types/components/SearchType'
import { List } from '@/app/posts/[brdId]/client'
import { IColumnConfig } from '@/types/ColumnDefType'

/**
 * 게시물 메뉴 기본 URL
 */
const BASE_MENU_URL = '/posts'

/**
 * 게시글 목록 props 정의
 */
export interface PostListProps {
    params: {
        brdId: string
    }
    searchParams: {
        postTtl?: string
        postCtt?: string
        writerId?: string
    }
}

/**
 * 게시글 검색 조건 입력 방식 정의
 */
const fields: ISearchField[] = [
    { label: '제목', key: 'postTtl', type: 'text' },
    { label: '내용', key: 'postCtt', type: 'text' },
    { label: '작성자ID', key: 'writerId', type: 'text' }
]

/**
 * 게시글 목록 컬럼 정의
 */
const columnsConfig: IColumnConfig[] = [
    { key: 'postId', label: '번호', type: 'text', size: 40, align: 'center' },
    { key: 'postTtl', label: '제목', type: 'link', linkBaseUrl: BASE_MENU_URL, linkKeys: ['brdId', 'postId'] },
    { key: 'writerId', label: '작성자ID', type: 'text', size: 100 },
    { key: 'delYn', label: '삭제여부', type: 'boolean', size: 70 },
    { key: 'insDt', label: '작성일시', type: 'date', size: 140 },
    { key: 'updDt', label: '수정일시', type: 'date', size: 140 },
    { type: 'actions', label: 'Actions', linkBaseUrl: BASE_MENU_URL, linkKeys: ['brdId', 'postId'], linkAddUrl: '/edit', menu: ['수정'], size: 60 }
]

/**
 * 메타 정보 생성
 * @param param
 * @returns
 */
export async function generateMetadata({ params }: { params: { brdId: string } }) {
    const { brdId } = await Promise.resolve(params)
    const board = await getBoard({ brdId })

    return {
        title: `${board.brdNm} 목록 - now2woy\'s Portfolio`,
        description: `${board.brdNm} 목록을 조회하는 페이지입니다.`
    }
}

/**
 * 게시글 목록 서버 컴포넌트
 * @param param
 * @returns
 */
export default async function ListViewer({ params, searchParams }: PostListProps) {
    const queryClient = new QueryClient()
    const { brdId } = await Promise.resolve(params)
    const { postTtl = '', postCtt = '', writerId = '' } = await Promise.resolve(searchParams)

    // 검색 조건을 쿼리 파라미터로 생성
    const query: string = new URLSearchParams({ postTtl, postCtt, writerId }).toString()

    // 게시글 검색 조건 초기 데이터 생성
    const initialData: ISearchData = { postTtl, postCtt, writerId }

    // prefetch
    await queryClient.prefetchQuery({
        queryKey: postKeys.lists(brdId, query),
        queryFn: fetchPosts
    })

    // 게시판 명 조회하여 제목 및 meta 생성 필요
    const board = await getBoard({ brdId })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h1 className="mb-4 text-2xl font-bold">{board.brdNm} 목록</h1>
                <List
                    brdId={brdId}
                    initialData={initialData}
                    fields={fields}
                    columnsConfig={columnsConfig}
                />
            </div>
        </HydrationBoundary>
    )
}
