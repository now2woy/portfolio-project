import { apiFetch } from '@/app/lib/apiClient'
import { IPageResponse } from '@/types/PageType'
import { IPostProps } from '@/types/apps/PostType'

/**
 * API 기본 URL
 */
const BASE_API_SERVICE_URL = '/api/board/v1/posts'

/**
 * 게시글 목록 API 조회
 * @param query
 * @returns
 */
export async function fetchPosts({
    brdId,
    query
}: {
    brdId: string
    query?: string
}) {
    try {
        return apiFetch<IPageResponse<IPostProps>>(
            `${BASE_API_SERVICE_URL}/${brdId}?${query}`
        )
    } catch (error) {
        throw error
    }
}

/**
 * 게시글 목록 API 조회
 * @param query
 * @returns
 */
export async function getPost({
    brdId,
    postId
}: {
    brdId: string
    postId: string
}) {
    try {
        return apiFetch<IPostProps>(
            `${BASE_API_SERVICE_URL}/${brdId}/${postId}`
        )
    } catch (error) {
        throw error
    }
}

/**
 * 게시글 API 입력
 * @param query
 * @returns
 */
export async function insertPost({
    brdId,
    data
}: {
    brdId: string
    data: IPostProps
}) {
    try {
        return apiFetch<IPostProps>(`${BASE_API_SERVICE_URL}/${brdId}`, {
            method: 'POST',
            body: data
        })
    } catch (error) {
        throw error
    }
}

/**
 * 게시글 API 수정
 * @param query
 * @returns
 */
export async function updatePost({
    brdId,
    postId,
    data
}: {
    brdId: string
    postId: string
    data: IPostProps
}) {
    try {
        return apiFetch<IPostProps>(
            `${BASE_API_SERVICE_URL}/${brdId}/${postId}`,
            {
                method: 'PUT',
                body: data
            }
        )
    } catch (error) {
        throw error
    }
}

/**
 * 게시글 API 삭제
 * @param query
 * @returns
 */
export async function deletePost({
    brdId,
    postId
}: {
    brdId: string
    postId: string
}) {
    try {
        return apiFetch<IPostProps>(
            `${BASE_API_SERVICE_URL}/${brdId}/${postId}`,
            {
                method: 'DELETE'
            }
        )
    } catch (error) {
        throw error
    }
}
