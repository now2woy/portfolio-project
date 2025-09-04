import axios from 'axios'
import { authenticationProps } from '@/types/CommonType'

/**
 * API 인스턴스
 * @returns
 */
export const createApi = (authentication?: authenticationProps) => {
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (authentication?.accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${authentication?.accessToken}`
    }

    return api
}

/**
 * 리프레시토큰을 이용해 액세스 토큰을 갱신
 * @param param
 */
const refreshAccessToken = async (authentication?: authenticationProps) => {
    // API 인스턴스를 직접 사용하는 대신, 새로운 인스턴스를 만들어 재귀 호출을 방지합니다.
    const refreshApi = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011',
        withCredentials: true // 쿠키 자동 포함
    })

    if (authentication?.accessToken) {
        refreshApi.defaults.headers.common['Authorization'] = `Bearer ${authentication?.accessToken}`
    }

    const res = await refreshApi.post(`/api/system/v1/auths/re-issue`)

    return res.data
}
