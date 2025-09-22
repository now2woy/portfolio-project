import { apiFetch } from '@/app/lib/apiClient'
import { IPageResponse } from '@/types/PageType'
import { IDomainProps } from '@/types/apps/DomainType'

/**
 * API 기본 URL
 */
const BASE_API_SERVICE_URL = '/api/meta/v1/domains'

/**
 * 도메인 목록 조회 (페이징)
 * @param {object} params - 파라미터
 * @param {string} [params.query] - URL 쿼리 문자열
 * @returns {Promise<IPageResponse<IDomainProps>>}
 */
export const fetchDomains = async ({ query }: { query?: string }) => {
    return apiFetch<IPageResponse<IDomainProps>>(`${BASE_API_SERVICE_URL}?${query}`)
}

/**
 * 도메인 단건 조회
 * @param {object} params - 파라미터
 * @param {string} params.domainId - 도메인 ID
 * @returns {Promise<IDomainProps>}
 */
export const getDomain = async ({ domainId }: { domainId: string }) => {
    return apiFetch<IDomainProps>(`${BASE_API_SERVICE_URL}/${domainId}`)
}

/**
 * 도메인 입력
 * @param {object} params - 파라미터
 * @param {IDomainProps} params.data - 입력할 도메인 데이터
 * @returns {Promise<IDomainProps>}
 */
export const insertDomain = async ({ data }: { data: IDomainProps }) => {
    return apiFetch<IDomainProps>(`${BASE_API_SERVICE_URL}`, {
        method: 'POST',
        body: data
    })
}

/**
 * 도메인 수정
 * @param {object} params - 파라미터
 * @param {string} params.domainId - 도메인 ID
 * @param {IDomainProps} params.data - 수정할 도메인 데이터
 * @returns {Promise<IDomainProps>}
 */
export const updateDomain = async ({ domainId, data }: { domainId: string; data: IDomainProps }) => {
    return apiFetch<IDomainProps>(`${BASE_API_SERVICE_URL}/${domainId}`, {
        method: 'PUT',
        body: data
    })
}

/**
 * 도메인 삭제
 * @param {object} params - 파라미터
 * @param {string} params.domainId - 도메인 ID
 * @returns {Promise<IDomainProps>}
 */
export const deleteDomain = async ({ domainId }: { domainId: string }) => {
    return apiFetch<IDomainProps>(`${BASE_API_SERVICE_URL}/${domainId}`, {
        method: 'DELETE'
    })
}
