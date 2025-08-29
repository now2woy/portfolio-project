import { apiFetch } from '@/app/lib/apiClient';
import { IMainMenuProps } from "@/types/components/MenuType";

const BASE_API_SERVICE_URL = '/api/system/v1/menus';

/**
 * 게시판 단건 조회
 * @param param
 * @returns 
 */
export const fetchUserMenus = async () => {
    try {
        return await apiFetch<IMainMenuProps[]>( `${ BASE_API_SERVICE_URL }/user-menus` );
    } catch(error) {
        throw error;
    }
}