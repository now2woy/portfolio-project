import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // ... 기타 설정
    async rewrites() {
        // NODE_ENV가 'production'일 경우 rewrites를 적용하지 않습니다.
        if (process.env.NODE_ENV === 'production') {
            return [];
        }

        // development 환경일 경우에만 rewrites를 적용합니다.
        return [
            {
                source: '/api/:path*',
                destination: `http://localhost:7201/api/:path*`,
            },
        ];
    }
    , typescript: {
        // 빌드 시 타입 검사 오류를 무시합니다.
        ignoreBuildErrors: true
    }
    , eslint: {
        // 빌드 시 ESLint 검사를 무시합니다.
        ignoreDuringBuilds: false
  },
};

export default nextConfig;
