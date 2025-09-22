import { IPageResponse } from '@/types/PageType'
import { IDomainProps } from '@/types/apps/DomainType'

/**
 * BFF 기본 URL
 */
const BASE_BFF_SERVICE_URL = '/bff/domains'

/**
 * 도메인 목록 BFF 조회
 * @param query
 * @returns
 */
export async function fetchDomainsViaBff(query?: string) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}?${query}`)

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<IPageResponse<IDomainProps>>
}

/**
 * 도메인 단건 BFF 조회
 * @param domainId
 * @returns
 */
export async function getDomainViaBff({ domainId }: { domainId: string }) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${domainId}`)

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<IDomainProps>
}

/**
 * 도메인 BFF 입력
 * @param data
 * @returns
 */
export async function insertDomainViaBff({ data }: { data: IDomainProps }) {
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
    return res.json() as Promise<IDomainProps>
}

/**
 * 도메인 BFF 수정
 * @param domainId
 * @param data
 * @returns
 */
export async function updateDomainViaBff({ domainId, data }: { domainId: string; data: IDomainProps }) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${domainId}`, {
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
    return res.json() as Promise<IDomainProps>
}

/**
 * 도메인 BFF 삭제
 * @param domainId
 * @returns
 */
export async function deleteDomainViaBff({ domainId }: { domainId: string }) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${domainId}`, {
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
    return res.json() as Promise<IDomainProps>
}
