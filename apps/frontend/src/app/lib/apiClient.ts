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
export async function apiFetch<T>(path: string, { method = 'GET', headers = {}, body, next, cache = 'no-store', timeoutMs = 8000, withAuth = true }: ApiOptions = {}): Promise<T> {
    const res = await apiFetchResponse(path, {
        method,
        headers,
        body,
        next,
        cache,
        timeoutMs,
        withAuth
    })

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

/**
 * API 요청 처리
 * @param path
 * @param param1
 * @returns
 */
export async function apiFetchResponse<T>(path: string, { method = 'GET', headers = {}, body, next, cache = 'no-store', timeoutMs = 8000, withAuth = true }: ApiOptions = {}): Promise<Response> {
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), timeoutMs)
    const url = path.startsWith('http') ? path : `${BASE}${path}`

    const accessToken = await getTokensFromCookies()

    async function doFetch(token: string) {
        let requestBody = body
        const requestHeaders = { ...headers }

        // body가 FormData 객체인지 확인
        if (body instanceof FormData) {
            // FormData인 경우, Content-Type 헤더를 수동으로 설정하지 않음.
            // fetch가 자동으로 'multipart/form-data'와 boundary를 생성합니다.
            // JSON.stringify도 사용하지 않습니다.
        } else if (body !== undefined) {
            // 그 외의 경우 (주로 JSON), Content-Type을 'application/json'으로 설정하고 본문을 문자열화합니다.
            requestHeaders['Content-Type'] = 'application/json'
            requestBody = JSON.stringify(body)
        }

        // 인증 헤더 추가 (위의 조건문과 독립적으로 처리)
        if (withAuth && token) {
            requestHeaders['Authorization'] = `Bearer ${token}`
        }

        const fetchOptions = {
            method,
            headers: requestHeaders,
            body: requestBody as BodyInit,
            cache,
            next,
            signal: controller.signal
        }

        return fetch(url, fetchOptions as RequestInit)
    }

    clearTimeout(t)

    return await doFetch(accessToken)
}
