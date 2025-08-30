import { IPageResponse } from '@/types/PageType'
import { ICdGroupProps } from '@/types/apps/CdGroupType'

/**
 * BFF 기본 URL
 */
const BASE_BFF_SERVICE_URL = '/bff/cd-groups'

/**
 * 코드 관리 BFF 목록 조회
 * @param query
 * @returns
 */
export async function fetchCdGroupsViaBff(query?: string) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}?${query}`)

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<IPageResponse<ICdGroupProps>>
}

/**
 * 코드 그룹 및 하위 코드 BFF 삭제
 * @param query
 * @returns
 */
export async function insertCdGroupViaBff({ data }: { data: ICdGroupProps }) {
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
    return res.json() as Promise<ICdGroupProps>
}

/**
 * 코드 그룹 및 하위 코드 BFF 삭제
 * @param query
 * @returns
 */
export async function updateCdGroupAndCdsViaBff({
    groupId,
    data
}: {
    groupId: string
    data: ICdGroupProps
}) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${groupId}/cds`, {
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
    return res.json() as Promise<ICdGroupProps>
}

/**
 * 코드 그룹 및 하위 코드 BFF 삭제
 * @param query
 * @returns
 */
export async function deleteCdGroupAndCdsViaBff({
    groupId
}: {
    groupId: string
}) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${groupId}`, {
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
    return res.json() as Promise<ICdGroupProps>
}
