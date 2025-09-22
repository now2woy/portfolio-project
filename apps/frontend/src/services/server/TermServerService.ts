import { apiFetch } from '@/app/lib/apiClient'
import { IPageResponse } from '@/types/PageType'
import { ITermProps } from '@/types/apps/TermType'

/**
 * API 기본 URL
 */
const BASE_API_SERVICE_URL = '/api/meta/v1/terms'

/**
 * 용어 목록 조회 (페이징)
 * @param {object} params - 파라미터
 * @param {string} [params.query] - URL 쿼리 문자열
 * @returns {Promise<IPageResponse<ITermProps>>}
 */
export const fetchTerms = async ({ query }: { query?: string }) => {
    return apiFetch<IPageResponse<ITermProps>>(`${BASE_API_SERVICE_URL}?${query}`)
}

/**
 * 용어 입력
 * @param {object} params - 파라미터
 * @param {ITermProps} params.data - 입력할 용어 데이터
 * @returns {Promise<ITermProps>}
 */
export const insertTerm = async ({ data }: { data: ITermProps }) => {
    return apiFetch<ITermProps>(`${BASE_API_SERVICE_URL}`, {
        method: 'POST',
        body: data
    })
}

/**
 * 용어 단건 조회
 * @param {object} params - 파라미터
 * @param {string} params.termId - 용어 ID
 * @returns {Promise<ITermProps>}
 */
export const getTerm = async ({ termId }: { termId: string }) => {
    return apiFetch<ITermProps>(`${BASE_API_SERVICE_URL}/${termId}`)
}

/**
 * 용어 수정
 * @param {object} params - 파라미터
 * @param {string} params.termId - 용어 ID
 * @param {ITermProps} params.data - 수정할 용어 데이터
 * @returns {Promise<ITermProps>}
 */
export const updateTerm = async ({ termId, data }: { termId: string; data: ITermProps }) => {
    return apiFetch<ITermProps>(`${BASE_API_SERVICE_URL}/${termId}`, {
        method: 'PUT',
        body: data
    })
}

/**
 * 용어 삭제
 * @param {object} params - 파라미터
 * @param {string} params.termId - 용어 ID
 * @returns {Promise<ITermProps>}
 */
export const deleteTerm = async ({ termId }: { termId: string }) => {
    return apiFetch<ITermProps>(`${BASE_API_SERVICE_URL}/${termId}`, {
        method: 'DELETE'
    })
}
