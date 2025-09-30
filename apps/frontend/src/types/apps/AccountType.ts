/**
 * 계좌 목록 검색 조건 props 정의
 */
export interface IAccountListProps {
    searchParams: {
        acnNo?: string
        acnNm?: string
        useYn?: string
    }
}

/**
 * 계좌 Props 정의
 */
export interface IAccountProps {
    /**
     * 계좌 ID
     */
    acnId: number
    /**
     * 사용자 ID
     */
    userId: string
    /**
     * 계좌 번호
     */
    acnNo: string
    /**
     * 은행 코드
     */
    bankCd: string
    /**
     * 계좌 명
     */
    acnNm?: string
    /**
     * 통화 코드
     */
    crncyCd: string
    /**
     * 계좌 상태 코드
     */
    acnStatCd: string
    /**
     * 개설 일자
     */
    estblDe?: string
    /**
     * 해지 일자
     */
    trmnatDe?: string
    /**
     * 잔액
     */
    blceAmt: number
    /**
     * 사용 여부
     */
    useYn: 'Y' | 'N'
    /**
     * 입력 일시
     */
    insDt?: string
    /**
     * 입력 ID
     */
    insId?: string
    /**
     * 수정 일시
     */
    updDt?: string
    /**
     * 수정 ID
     */
    updId?: string
    /**
     * 인덱스 시그니처
     */
    [key: string]: unknown
}
