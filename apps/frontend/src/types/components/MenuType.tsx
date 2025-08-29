/**
 * 메인 메뉴 정보 인터페이스
 */
export interface IMainMenuProps {
	/**
	 * 메뉴 ID
	 */
	menuId : number; 
	/**
	 * 메뉴 명
	 */
	menuNm : string;
	/**
	 * 상위 메뉴 ID
	 */
	upMenuId : number; 
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
	 * 하위 메뉴
	 */
    children?: IMainMenuProps[]
		/**
	 * 인덱스 시그니처
	 */
	[key: string]: unknown;
}

/**
 * 서브 메뉴 정보 인터페이스
 */
export interface ISubMenuProps {
	/**
	 * 메뉴 ID
	 */
	menuId : number; 
	/**
	 * 메뉴 명
	 */
	menuNm : string;
	/**
	 * 상위 메뉴 ID
	 */
	upMenuId : number; 
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
}