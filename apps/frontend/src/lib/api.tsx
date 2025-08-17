import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { redirect } from 'next/navigation';
import { ErrorResponse, authenticationProps } from '@/types/CommonType';

/**
 * 오류 처리
 * @param api 
 */
const addInterceptors = (api: AxiosInstance) => {
    api.interceptors.response.use( (response: AxiosResponse) => response, ( error: AxiosError<ErrorResponse> ) => {
        if (error.response) {
            const status = error.response.status;
            const errData = error.response.data;

            console.error(`[API ERROR] ${status} - ${errData?.code} - ${errData?.message}`);

            if (status === 403) {
                redirect("/error/403");
            } else if (status === 404) {
                redirect("/error/404");
            } else if (status >= 500) {
                redirect("/error/500");
            } else {
                // 기타 에러
                redirect("/error/500");
            }
        } else {
            console.error("네트워크 오류", error.message);
            redirect("/error/500");
        }

        return Promise.reject(error);
    } );
};

/**
 * API 인스턴스
 * @returns 
 */
export const createApi = ( authentication : authenticationProps ) => {
    const api = axios.create({
         baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011'
         , withCredentials: true
         , headers: {
            'Content-Type': 'application/json',
        }
    });

    if (authentication.accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${authentication.accessToken}`;
    }

    // 오류 처리 인터셉터 주입
    addInterceptors(api);

    return api;
};

// TODO 리프레시토큰을 이용해 액세스 토큰을 갱신하는 함수

// TODO 실패시 액세스토큰 갱신 후 재시도 하는 함수