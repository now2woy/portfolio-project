import 'server-only'
import { cookies } from 'next/headers'

/**
 * 요청 기본 PATH
 */
const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011'

type ApiOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    headers?: Record<string, string>
    body?: unknown
    next?: { revalidate?: number; tags?: string[] }
    cache?: RequestCache
    timeoutMs?: number
    withAuth?: boolean // 인증 헤더 포함 여부
}

/**
 * 쿠키에서 토큰 읽기
 */
async function getTokensFromCookies(): Promise<string> {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value || ''
    return accessToken
}

/**
 * API 요청 처리
 * @param path
 * @param param1
 * @returns
 */
export async function apiFetch<T>(
    path: string,
    {
        method = 'GET',
        headers = {},
        body,
        next,
        cache = 'no-store',
        timeoutMs = 8000,
        withAuth = true
    }: ApiOptions = {}
): Promise<T> {
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), timeoutMs)
    const url = path.startsWith('http') ? path : `${BASE}${path}`

    const accessToken = await getTokensFromCookies()

    async function doFetch(token: string) {
        const fetchOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(withAuth && token
                    ? { Authorization: `Bearer ${token}` }
                    : {}),
                ...headers
            },
            body: body ? JSON.stringify(body) : undefined,
            cache,
            next,
            signal: controller.signal
        }
        return fetch(url, fetchOptions)
    }

    const res = await doFetch(accessToken)

    clearTimeout(t)

    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`[${res.status}] ${res.statusText} - ${text}`)
    }

    // 리턴 값이 성공이지만 데이터가 없는 경우가 있어 text로 받는다.
    const text = await res.text()

    // text가 있을 경우
    if (text) {
        // json 파싱
        const result = JSON.parse(text)
        return result as T
    }

    return text as T
}
