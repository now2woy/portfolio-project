import { apiFetch } from '@/app/lib/apiClient'
import { IMainMenuProps } from '@/types/components/MenuType'

const BASE_API_SERVICE_URL = '/api/system/v1/menus'

/**
 * 모든 메뉴 목록 조회
 * @param param
 * @returns
 */
export const fetchAllMenus = async () => {
    try {
        return await apiFetch<IMainMenuProps[]>(`${BASE_API_SERVICE_URL}/all-menus`)
    } catch (error) {
        throw error
    }
}

/**
 * 사용자 메뉴 목록 조회
 * @param param
 * @returns
 */
export const fetchUserMenus = async () => {
    try {
        return await apiFetch<IMainMenuProps[]>(`${BASE_API_SERVICE_URL}/user-menus`)
    } catch (error) {
        throw error
    }
}

/**
 * 코드 그룹 및 하위 코드 수정
 * @param params
 * @returns
 */
export const updateAllMenus = async ({ data }: { data: IMainMenuProps[] }) => {
    try {
        return await apiFetch<IMainMenuProps[]>(`${BASE_API_SERVICE_URL}`, {
            method: 'PUT',
            body: data
        })
    } catch (error) {
        throw error
    }
}
