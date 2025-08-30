/**
 * 오류 Response 인터페이스 정의
 */
export interface ErrorResponse {
    /**
     * 비즈니스 에러 코드
     */
    code: string;
    /**
     * 사용자에게 보여줄 메시지
     */
    message: string;
    /**
     * 개발자용 상세 설명 (optional)
     */
    detail?: string;
    /**
     * 요청 URL (optional)
     */
    path?: string;
    /**
     * 발생 시각 (ISO 8601, optional)
     */
    timestamp?: string;
}

/**
 * 인증 프로퍼티 정의
 */
export interface authenticationProps {
  accessToken: string;
  refreshToken : string
}