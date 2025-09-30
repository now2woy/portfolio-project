import { apiFetch } from '@/app/lib/apiClient'
import { IPageResponse } from '@/types/PageType'
import { IAccountProps } from '@/types/apps/AccountType'

/**
 * 계좌 목록 조회 (페이지)
 * @param query
 * @returns
 */
export const fetchAccounts = async ({ query }: { query?: string }): Promise<IPageResponse<IAccountProps>> => {
    return apiFetch<IPageResponse<IAccountProps>>(`/api/finance/v1/accounts?${query}`)
}

/**
 * 계좌 목록 조회
 * @param acnId
 * @returns
 */
export const getAccount = async ({ acnId }: { acnId: number }): Promise<IAccountProps> => {
    return apiFetch<IAccountProps>(`/api/finance/v1/accounts/${acnId}`)
}

/**
 * 계좌 입력
 * @param data
 * @returns
 */
export const insertAccount = async ({ data }: { data: IAccountProps }): Promise<IAccountProps> => {
    return apiFetch<IAccountProps>(`/api/finance/v1/accounts`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

/**
 * 계좌 수정
 * @param acnId
 * @param data
 * @returns
 */
export const updateAccount = async ({ acnId, data }: { acnId: number; data: IAccountProps }): Promise<IAccountProps> => {
    return apiFetch<IAccountProps>(`/api/finance/v1/accounts/${acnId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
}

/**
 * 계좌 삭제
 * @param acnId
 */
export const deleteAccount = async ({ acnId }: { acnId: number }): Promise<IAccountProps> => {
    return apiFetch<IAccountProps>(`/api/finance/v1/accounts/${acnId}`, {
        method: 'DELETE'
    })
}
