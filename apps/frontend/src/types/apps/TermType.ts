/**
 * 용어 타입 인터페이스
 */
export interface ITermProps {
    /**
     * 용어 ID
     */

    termId: string
    /**
     * 용어 명
     */
    termNm: string
    /**
     * 용어 영문 명
     */
    termEngNm: string
    /**
     * 도메인 ID
     */
    domainId: string
    /**
     * 설명
     */
    dc: string
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
