/**
 * 도메인 타입 인터페이스
 */
export interface IDomainProps {
    /**
     * 도메인 ID
     */
    domainId: string
    /**
     * 도메인 명
     */
    domainNm: string
    /**
     * 데이터 타입 코드
     */
    dataTyCd: string
    /**
     * 길이
     */
    lt?: string
    /**
     * 포멧
     */
    format?: string
    /**
     * 단위 코드
     */
    unitCd?: string
    /**
     * 코드 기반 여부
     */
    cdBasedYn: 'Y' | 'N'
    /**
     * 그룹 ID
     */
    groupId?: string
    /**
     * 비고
     */
    rm?: string
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
