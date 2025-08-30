/**
 * 검색 컴포넌트 Props 타입 정의
 */
export interface ISearchProps {
    initialData: ISearchData
    fields: ISearchField[]
}

/**
 * 검색 조건 데이터 타입 정의
 * 이 인터페이스는 검색 조건을 사용할때 상속 받아 생성 해야 됨.
 */
export interface ISearchData {
    [key: string]: string
}

/**
 * 검색 조건 입력방식 타입 정의
 * 이 인터페이스는 검색 조건을 사용할때 상속 받아 생성 해야 됨.
 */
export interface ISearchField {
    /**
     * 필드의 제목
     */
    label: string
    /**
     * 데이터 객체에서 값을 가져올 키
     */
    key: keyof ISearchData
    /**
     * 폼 필드의 타입 (예: 'text', 'textarea', 'select', 'viewer' 등)
     * 'viewer'는 뷰 전용 필드를 나타냅니다.
     */
    type: 'text' | 'select'
    /**
     * 폼 타입이 select일 경우 옵션 값들
     */
    options?: { value: string; label: string }[]
}
