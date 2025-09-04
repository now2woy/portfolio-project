import { QueryFunctionContext } from '@tanstack/react-query'

import { fetchPostsViaBff } from '@/services/client/PostClientService'
import { IPageResponse } from '@/types/PageType'
import { IPostProps } from '@/types/apps/PostType'

/**
 * 쿼리 키 정의
 */
export const postKeys = {
    // 최상위 키
    all: ['posts'] as const,
    // 특정 게시판에 속한 게시글 목록 쿼리를 위한 키
    lists: (brdId: string, query?: string) => [...postKeys.all, 'list', brdId, query] as const
}

/**
 * 게시글 목록 조회
 * @param context
 * @returns
 */
export const fetchPosts = async (context: QueryFunctionContext<ReturnType<typeof postKeys.lists>>): Promise<IPageResponse<IPostProps>> => {
    const [_, __, brdId, query] = context.queryKey
    const res = await fetchPostsViaBff({ brdId, query })

    return res
}
