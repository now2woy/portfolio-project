/**
 * 검색 컴포넌트 Props 타입 정의
 */
export interface ISearchProps {
    initialData: ISearchData;
    fields: ISearchField[];
}

/**
 * 검색 조건 데이터 타입 정의
 * 이 인터페이스는 검색 조건을 사용할때 상속 받아 생성 해야 됨.
 */
export interface ISearchData {
    [key: string]: string;
}

/**
 * 검색 조건 입력방식 타입 정의
 * 이 인터페이스는 검색 조건을 사용할때 상속 받아 생성 해야 됨.
 */
export interface ISearchField {
    label: string;
    value: keyof ISearchData;
    type: 'text' | 'select';
    options?: { value: string; label: string }[];
}
