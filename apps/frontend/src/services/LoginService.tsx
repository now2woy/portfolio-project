import { createApi } from '@/lib/api';
import { ILoginProps } from "@/types/LoginType";
import { authenticationProps } from '@/types/CommonType';

/**
 * API 기본 URL
 */
const BASE_SERVICE_URL = '/api/system/v1/auths';

/**
 * 게시글 입력
 * @param params
 * @returns 
 */
export const fetchLogin = async ( { authentication, data } : { authentication: authenticationProps, data: ILoginProps } ) => {
    const api = createApi( authentication );
    const res = await api.post( `${ BASE_SERVICE_URL }/login`, data );
    return res.data;
};


/**
 * 게시글 입력
 * @param params
 * @returns 
 */
export const fetchLogout = async () => {
    const api = createApi();
    await api.post( `${ BASE_SERVICE_URL }/logout` );
};