import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getAccessToken } from '@/lib/tokenRefresher'

/**
 * 기본 접속 URL
 */
const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011'

/**
 * sameSite Type 정의
 */
type sameSiteType = true | false | 'lax' | 'strict' | 'none' | undefined

/**
 *
 * @param request
 * @returns
 */
export const middleware = async (request: NextRequest) => {
    // 쿠키에서 토큰을 가져옵니다. (토큰이 httpOnly로 설정되어 있으면 서버에서만 접근 가능)
    const accessToken = request.cookies.get('accessToken')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value
    const pathname = request.nextUrl.pathname
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup')

    // console.log('pathname : ', pathname, accessToken, isTokenExpired({ token: accessToken || '' }))

    const newResponse = NextResponse.next()

    // 토큰이 없는데 보호된 페이지에 접근하려는 경우 로그인 페이지로 리디렉션
    if (!accessToken && !refreshToken && !isAuthPage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 토큰이 없고 보호되지 않은 페이지로 접근할땐 통과
    if (!accessToken && !refreshToken && isAuthPage) {
        return NextResponse.next()
    }

    // 토큰 유효하지 않을 경우
    if (isTokenExpired({ token: accessToken || '' })) {
        const newAccessToken = await getAccessToken(async () => {
            let newAccessToken = ''
            // 리프레시 토큰으로 새로운 액세스 토큰 발급 시도
            const refreshResponse = await fetch(`${BASE}/api/system/v1/auths/re-issue`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    Cookie: `refreshToken=${refreshToken}`
                }
            })

            if (refreshResponse.ok) {
                let sameSite: sameSiteType = 'lax'
                // 운영일 경우
                if (BASE === process.env.NEXT_PUBLIC_API_URL) {
                    sameSite = 'none'
                }
                // 갱신 성공 시, 새 토큰을 쿠키에 담아 응답
                const token = await refreshResponse.json()
                newResponse.cookies.set('accessToken', token.accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: sameSite,
                    path: '/',
                    maxAge: 60 * 60 * 12
                })
                newResponse.cookies.set('refreshToken', token.refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: sameSite,
                    path: '/',
                    maxAge: 60 * 60 * 12
                })

                newAccessToken = token.accessToken
            }

            return newAccessToken
        })

        // 액세스 토큰이 없을 경우 갱신 실패
        if (newAccessToken === '') {
            // 갱신 실패 시 쿠키 초기화 후 로그인 페이지로 리디렉션
            const newResponse = NextResponse.redirect(new URL('/login', request.url))
            newResponse.cookies.delete('accessToken')
            newResponse.cookies.delete('refreshToken')
            return newResponse
        }
    }

    // 토큰이 있는데 로그인 페이지에 접근하려는 경우 메인 페이지로 리디렉션
    if (accessToken && refreshToken && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return newResponse
}

// 미들웨어를 실행할 경로를 설정합니다.
export const config = {
    matcher: [
        /*
         * 아래와 같은 경로를 제외한 모든 요청 경로에 미들웨어를 적용합니다.
         * 1. api 라우트 (`/api/*`)
         * 2. `_next/static` 및 `_next/image`와 같은 Next.js 내부 파일 (`/_next/`로 시작하는 모든 파일)
         * 3. `favicon.ico`와 같은 정적 파일 (일반적으로 `.`, `_`, `.`이 포함된 모든 파일)
         * 4. 봇 관련 파일 (e.g., `robots.txt`)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|[\\w-]+\\.\\w+).*)'
    ]
}

/**
 * JWT의 만료 여부를 확인하는 함수
 * @param token - 유효성을 검사할 JWT
 * @returns 토큰이 유효하면 true, 만료되었거나 형식이 잘못되었으면 false
 */
const isTokenExpired = ({ token }: { token: string }) => {
    if (!token) {
        return true // 토큰이 없으면 만료된 것으로 간주
    }

    try {
        // JWT의 페이로드(payload) 부분만 추출
        // 토큰은 '헤더.페이로드.서명' 구조이므로, '.'을 기준으로 두 번째 부분이 페이로드입니다.
        const base64Url = token.split('.')[1]

        // Base64Url 디코딩
        // Base64Url은 일반 Base64와 달리 일부 문자가 다릅니다.
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join('')
        )

        // 3. JSON 파싱
        const payload = JSON.parse(jsonPayload)

        // 만료 시간(exp) 확인
        // JWT의 exp 값은 '초' 단위의 Unix Timestamp입니다.
        if (payload.exp) {
            // 현재 시간을 초 단위로 변환
            const now = Math.floor(Date.now() / 1000)
            // 만료까지 남은 시간 (초)
            const expiresIn = payload.exp - now

            // 남은 시간이 10초 이하이면 true 반환
            return expiresIn <= 10
        }

        // exp 필드가 없으면 만료되지 않은 것으로 간주
        return false
    } catch (error) {
        // 토큰 형식이 잘못되었을 경우 에러 처리
        console.error('Invalid token format:', error)

        // 유효하지 않은 토큰은 만료된 것으로 간주
        return true
    }
}
