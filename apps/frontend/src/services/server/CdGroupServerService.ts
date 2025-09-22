import { apiFetch } from '@/app/lib/apiClient'
import { IPageResponse } from '@/types/PageType'
import { ICdGroupProps, ICdProps } from '@/types/apps/CdGroupType'

/**
 * API 기본 URL
 */
const BASE_API_SERVICE_URL = '/api/system/v1/cd-groups'
/**
 * 코드 API 기본 URL
 */
const CD_API_SERVICE_URL = '/api/system/v1/cds'

/**
 * 코드 그룹 목록 조회 (페이징)
 * @param {string} [params.query] - URL 쿼리 문자열
 * @returns {Promise<IPageResponse<ICdGroupProps>>} 코드 그룹 페이지 응답
 */
export const fetchCdGroups = async ({ query }: { query?: string }) => {
    return apiFetch<IPageResponse<ICdGroupProps>>(`${BASE_API_SERVICE_URL}?${query}`)
}

/**
 * 특정 코드 그룹의 하위 코드 목록 조회
 * @param {string} params.groupId - 코드 그룹 ID
 * @returns {Promise<ICdProps[]>} 코드 목록
 */
export const fetchCds = async ({ groupId }: { groupId: string }) => {
    return apiFetch<ICdProps[]>(`${CD_API_SERVICE_URL}/${groupId}`)
}

/**
 * 코드 그룹 단건 조회
 * @param {string} params.groupId - 코드 그룹 ID
 * @returns {Promise<ICdGroupProps>} 코드 그룹 데이터
 */
export const getCdGroup = async ({ groupId }: { groupId: string }) => {
    return apiFetch<ICdGroupProps>(`${BASE_API_SERVICE_URL}/${groupId}`)
}

/**
 * 코드 그룹 입력
 * @param {ICdGroupProps} params.data - 입력할 코드 그룹 데이터
 * @returns {Promise<ICdGroupProps>} 생성된 코드 그룹 데이터
 */
export const insertCdGroup = async ({ data }: { data: ICdGroupProps }) => {
    return apiFetch<ICdGroupProps>(`${BASE_API_SERVICE_URL}`, {
        method: 'POST',
        body: data
    })
}

/**
 * 코드 그룹 수정
 * @param {string} params.groupId - 수정할 코드 그룹 ID
 * @param {ICdGroupProps} params.data - 수정할 코드 그룹 데이터
 * @returns {Promise<ICdGroupProps>} 수정된 코드 그룹 데이터
 */
export const updateCdGroup = async ({ groupId, data }: { groupId: string; data: ICdGroupProps }) => {
    return apiFetch<ICdGroupProps>(`${BASE_API_SERVICE_URL}/${groupId}`, {
        method: 'PUT',
        body: data
    })
}

/**
 * 코드 그룹 및 하위 코드 수정
 * @param {string} params.groupId - 수정할 코드 그룹 ID
 * @param {ICdGroupProps} params.data - 수정할 코드 그룹 및 하위 코드 데이터
 * @returns {Promise<ICdGroupProps>} 수정된 코드 그룹 데이터
 */
export const updateCdGroupAndCds = async ({ groupId, data }: { groupId: string; data: ICdGroupProps }) => {
    return apiFetch<ICdGroupProps>(`${BASE_API_SERVICE_URL}/${groupId}/cds`, {
        method: 'PUT',
        body: data
    })
}

/**
 * 코드 그룹 및 하위 코드 삭제
 * @param {string} params.groupId - 삭제할 코드 그룹 ID
 * @returns {Promise<ICdGroupProps>} 삭제 결과
 */
export const deleteCdGroupAndCds = async ({ groupId }: { groupId: string }) => {
    return apiFetch<ICdGroupProps>(`${BASE_API_SERVICE_URL}/${groupId}`, {
        method: 'DELETE'
    })
}
