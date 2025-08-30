/**
 * 메인 메뉴 정보 인터페이스
 */
export interface IMainMenuProps {
	/**
	 * 메뉴 ID
	 */
	menuId : string; 
	/**
	 * 메뉴 명
	 */
	menuNm : string;
	/**
	 * 상위 메뉴 ID
	 */
	upMenuId? : string; 
	/**
	 * 링크 URL
	 */
	linkUrl? : string;
	/**
	 * 아이콘 코드
	 */
	iconCd? : string;
	/**
	 * 정렬 순서
	 */
	sortOrd : number;
	/**
	 * 사용 여부
	 */
	useYn : 'Y' | 'N';
	/**
	 * 입력 일시
	 */
	insDt? : string;
	/**
	 * 입력 ID
	 */
	insId? : string;
	/**
	 * 수정 일시
	 */
	updDt? : string;
	/**
	 * 수정 ID
	 */
	updId? : string;
	/**
	 * 하위 메뉴
	 */
    children?: IMainMenuProps[]
		/**
	 * 인덱스 시그니처
	 */
	[key: string]: unknown;
}