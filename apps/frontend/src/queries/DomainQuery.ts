import { QueryFunctionContext } from '@tanstack/react-query'

import { fetchDomainsViaBff, getDomainViaBff } from '@/services/client/DomainClientService'
import { IPageResponse } from '@/types/PageType'
import { IDomainProps } from '@/types/apps/DomainType'

/**
 * 쿼리 키 정의
 */
export const domainKeys = {
    // 최상위 키
    all: ['domains'] as const,
    // 목록 쿼리를 위한 키
    lists: (query?: string) => [...domainKeys.all, 'list', query] as const,
    // 상세 쿼리를 위한 키
    details: (domainId: string) => [...domainKeys.all, 'detail', domainId] as const
}

/**
 * 도메인 목록 조회
 * @param context
 * @returns
 */
export const fetchDomains = async (context: QueryFunctionContext<ReturnType<typeof domainKeys.lists>>): Promise<IPageResponse<IDomainProps>> => {
    const [_, __, query] = context.queryKey
    const res = await fetchDomainsViaBff(query)

    return res
}

/**
 * 도메인 단건 조회
 * @param context
 * @returns
 */
export const getDomain = async (context: QueryFunctionContext<ReturnType<typeof domainKeys.details>>): Promise<IDomainProps> => {
    const [_, __, domainId] = context.queryKey
    const res = await getDomainViaBff({ domainId })

    return res
}
