// 코드 데이터 정의
export interface IBoardProps {
    /**
     * 게시판 ID
     */
    brdId: number
    /**
     * 게시판 명
     */
    brdNm: string
    /**
     * 게시판 유형 코드
     */
    brdTyCd: string
    /**
     * 답글 허용 여부
     */
    allowReplyYn: 'Y' | 'N'
    /**
     * 삭제 여부
     */
    delYn: 'Y' | 'N'
    /**
     * 입력 일시
     */
    insDt: string
    /**
     * 입력 ID
     */
    insId?: string
    /**
     * 수정 일시
     */
    updDt: string
    /**
     * 수정 ID
     */
    updId?: string
}
