import { QueryFunctionContext } from '@tanstack/react-query'

import { fetchTermsViaBff, getTermViaBff } from '@/services/client/TermClientService'
import { IPageResponse } from '@/types/PageType'
import { ITermProps } from '@/types/apps/TermType'

/**
 * 쿼리 키 정의
 */
export const termKeys = {
    // 최상위 키
    all: ['terms'] as const,
    // 목록 쿼리를 위한 키
    lists: (query?: string) => [...termKeys.all, 'list', query] as const,
    // 상세 쿼리를 위한 키
    details: (termId: string) => [...termKeys.all, 'detail', termId] as const
}

/**
 * 용어 목록 조회
 * @param context
 * @returns
 */
export const fetchTerms = async (context: QueryFunctionContext<ReturnType<typeof termKeys.lists>>): Promise<IPageResponse<ITermProps>> => {
    const [_, __, query] = context.queryKey
    const res = await fetchTermsViaBff(query)

    return res
}

/**
 * 용어 단건 조회
 * @param context
 * @returns
 */
export const getTerm = async (context: QueryFunctionContext<ReturnType<typeof termKeys.details>>): Promise<ITermProps> => {
    const [_, __, termId] = context.queryKey
    const res = await getTermViaBff({ termId })

    return res
}
