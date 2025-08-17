// 코드 데이터 정의
export interface IPostProps {
	/**
	 * 게시판 ID
	 */
	brdId: number;
	/**
	 * 게시글 ID
	 */
	postId?: number;
	/**
	 * 게시글 제목
	 */
	postTtl?: string;
	/**
	 * 게시글 내용
	 */
	postCtt?: string;
	/**
	 * 작성자 ID
	 */
	writerId?: string;
	/**
	 * 조회 건수
	 */
	viewCnt?: number;
	/**
     * 삭제 여부
    */
   delYn: 'Y' | 'N';
   /**
    * 삭제 일시
    */
   delDt?: string;
	/**
	 * 입력 일시
	 */
	insDt?: string;
	/**
	 * 입력 ID
	 */
	insId?: string;
	/**
	 * 수정 일시
	 */
	updDt?: string;
	/**
	 * 수정 ID
	 */
	updId?: string;
}