import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { redirect } from 'next/navigation';
import { ErrorResponse, authenticationProps } from '@/types/CommonType';
import Cookies from 'js-cookie';

/**
 * 오류 처리
 * @param api 
 */
const addInterceptors = ( { api, authentication } : { api : AxiosInstance, authentication? : authenticationProps } ) => {
    api.interceptors.response.use( (response: AxiosResponse) => response, async ( error: AxiosError<ErrorResponse> ) => {
        if (error.response) {
            const originalRequest = error.config;
            const status = error.response.status;
            const errData = error.response.data;

            console.error(`[API ERROR] ${status} - ${errData?.code} - ${errData?.message}`);

            // 401 Unauthorized 오류 처리
            // 'retry' 플래그가 없어야 무한 루프를 방지할 수 있습니다.
            if (status === 401 && originalRequest && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    if (!authentication?.refreshToken) {
                        // 리프레시 토큰이 없으면 로그인 페이지로 리디렉션
                        redirect( '/login' );
                        return Promise.reject( error );
                    }

                    // 새 액세스 토큰을 받아와서 헤더 업데이트
                    const newAccessToken = await refreshAccessToken( authentication );

                    // 헤더의 액세스 토큰을 업데이트
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    // 업데이트된 헤더로 원래 요청을 재시도합니다.
                    return api(originalRequest);

                } catch (refreshError) {
                    // 리프레시 실패 시, 로그인 페이지로 리디렉션
                    console.error("토큰 갱신 실패:", refreshError);

                    Cookies.remove('accessToken');
                    Cookies.remove('refreshToken');

                    redirect('/login');
                    return Promise.reject(refreshError);
                }
            }

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
export const createApi = ( authentication? : authenticationProps ) => {
    const api = axios.create({
         baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011'
         , withCredentials: true
         , headers: {
            'Content-Type': 'application/json',
        }
    });

    if (authentication?.accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${authentication?.accessToken}`;
    }

    // 오류 처리 인터셉터 주입
    addInterceptors( { api, authentication } );

    return api;
};

/**
 * 리프레시토큰을 이용해 액세스 토큰을 갱신
 * @param param
 */
const refreshAccessToken = async ( authentication? : authenticationProps ) => {
    // API 인스턴스를 직접 사용하는 대신, 새로운 인스턴스를 만들어 재귀 호출을 방지합니다.
    const refreshApi = axios.create( {
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011',
        withCredentials: true, // 쿠키 자동 포함
    } );

    if ( authentication?.accessToken ) {
        refreshApi.defaults.headers.common[ 'Authorization' ] = `Bearer ${ authentication?.accessToken }`;
    }

    const res = await refreshApi.post( `/api/system/v1/auths/re-issue` );

    return res.data; 
}