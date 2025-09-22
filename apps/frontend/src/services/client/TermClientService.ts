import { IPageResponse } from '@/types/PageType'
import { ITermProps } from '@/types/apps/TermType'

/**
 * BFF 기본 URL
 */
const BASE_BFF_SERVICE_URL = '/bff/terms'

/**
 * 용어 목록 BFF 조회
 * @param query
 * @returns
 */
export async function fetchTermsViaBff(query?: string) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}?${query ?? ''}`)

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<IPageResponse<ITermProps>>
}

/**
 * 용어 단건 BFF 조회
 * @param termId
 * @returns
 */
export async function getTermViaBff({ termId }: { termId: string }) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${termId}`)

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<ITermProps>
}

/**
 * 용어 BFF 입력
 * @param data
 * @returns
 */
export async function insertTermViaBff({ data }: { data: ITermProps }) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}`, {
        method: 'POST',
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
    return res.json() as Promise<ITermProps>
}

/**
 * 용어 BFF 수정
 * @param termId
 * @param data
 * @returns
 */
export async function updateTermViaBff({ termId, data }: { termId: string; data: ITermProps }) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${termId}`, {
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
    return res.json() as Promise<ITermProps>
}

/**
 * 용어 BFF 삭제
 * @param termId
 * @returns
 */
export async function deleteTermViaBff({ termId }: { termId: string }) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${termId}`, {
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
    return res.json() as Promise<ITermProps>
}
