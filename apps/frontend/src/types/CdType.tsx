
/**
 * 코드 목록 검색 조건 props 정의
 */
export interface ICdListProps {
    searchParams : {
        groupId? : string,
        groupNm? : string,
        useYn? : string,
    };
}

/**
 * 코드 그룹 Props 정의
 */
export interface ICdGroupProps {
	/**
	 * 코드 그룹 ID
	 */
	groupId : string;
	/**
	 * 코드 그룹 명
	 */
	groupNm : string;
	/**
	 * 설명
	 */
	dc? : string;
	/**
	 * 데이터 타입 코드
	 */
	dataTyCd? : string;
	/**
	 * 길이
	 */
	lt? : number;
	/**
	 * 포멧
	 */
	format? : string;
	/**
	 * 단위 코드
	 */
	unitCd? : string;
	/**
	 * 고정 길이 여부
	 */
	fixedLtYn? : string;
	/**
	 * 사용 여부
	 */
	useYn? : 'Y' | 'N';
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
     * 하위 코드 목록
     */
    cds? : ICdProps[]
}

/**
 * 코드 Props 정의
 */
export interface ICdProps {
	/**
	 * 코드 그룹 ID
	 */
	groupId : string;
	/**
	 * 코드 ID
	 */
	cdId : string;
	/**
	 * 코드 명
	 */
	cdNm : string;
	/**
	 * 정렬 순서
	 */
	sortOrdr : number;
	/**
	 * 사용여부
	 */
	useYn : 'Y' | 'N';
	/**
	 * 비고
	 */
	rm? : string;
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
}