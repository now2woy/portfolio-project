import { IPageResponse } from '@/types/PageType'
import { IPostProps } from '@/types/apps/PostType'

/**
 * BFF 기본 URL
 */
const BASE_BFF_SERVICE_URL = '/bff/posts'

/**
 * 게시글 목록 BFF 조회
 * @param query
 * @returns
 */
export async function fetchPostsViaBff({
    brdId,
    query
}: {
    brdId: string
    query?: string
}) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${brdId}?${query}`)

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<IPageResponse<IPostProps>>
}

/**
 * 게시글 BFF 입력
 * @param query
 * @returns
 */
export async function insertPostViaBff({
    brdId,
    data,
    atchFileId
}: {
    brdId: string
    data: IPostProps
    atchFileId?: number
}) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${brdId}`, {
        method: 'POST',
        body: JSON.stringify({
            ...data,
            atchFileId
        })
    })

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<IPostProps>
}

/**
 * 게시글 BFF 수정
 * @param query
 * @returns
 */
export async function updatePostViaBff({
    brdId,
    postId,
    data
}: {
    brdId: string
    postId: string
    data: IPostProps
}) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${brdId}/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<IPostProps>
}

/**
 * 게시글 BFF 삭제
 * @param query
 * @returns
 */
export async function deletePostViaBff({
    brdId,
    postId
}: {
    brdId: string
    postId: string
}) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${brdId}/${postId}`, {
        method: 'DELETE'
    })

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<IPostProps>
}
