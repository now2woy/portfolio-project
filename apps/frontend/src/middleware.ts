import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
    // 쿠키에서 토큰을 가져옵니다. (토큰이 httpOnly로 설정되어 있으면 서버에서만 접근 가능)
    const token = request.cookies.get('accessToken')?.value;

    const pathname = request.nextUrl.pathname;
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

    // 토큰이 없는데 보호된 페이지에 접근하려는 경우 로그인 페이지로 리디렉션
    if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
    }

    // 토큰이 있는데 로그인 페이지에 접근하려는 경우 메인 페이지로 리디렉션
    if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// 미들웨어를 실행할 경로를 설정합니다.
export const config = {
    matcher: [
        '/'
        , '/login'
        , '/signup'
        , '/cds/:path*'
        , '/boards/:path*'
        , '/posts/:path*'
    ]
};