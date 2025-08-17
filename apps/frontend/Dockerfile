# 빌드 환경 (builder)
FROM node:22.18.0-alpine AS builder

# 빌드 환경변수 설정
# --build-arg로 전달받은 값을 NEXT_PUBLIC_API_URL에 할당
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /app

# package.json과 lock 파일을 먼저 복사하여 의존성 캐싱을 최적화
COPY package.json package-lock.json ./

# 의존성 설치 (개발 및 프로덕션)
RUN npm ci

# 소스 코드 복사
COPY . .

# Next.js 프로젝트 빌드
RUN npm run build

# ---
# 프로덕션 환경 (production)
FROM node:22.18.0-alpine

WORKDIR /app

# 프로덕션 환경 변수 설정
ENV NODE_ENV=production

# 빌드 환경에서 필요한 파일만 복사
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 프로덕션 의존성만 설치
# TODO 이부분 현재 오류로 아래 부분으로 대체 오류 처리 필요 / 'npm ci --production' 대신 'npm ci --omit=dev'를 사용해야 합니다.
RUN npm ci --omit=dev

# 애플리케이션 실행 포트
EXPOSE 3011

# 애플리케이션 실행
CMD ["npm", "run", "start"]