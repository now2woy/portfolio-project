import { ICdProps } from '@/types/apps/CdGroupType'

/**
 * 검색 컴포넌트 Props 타입 정의
 */
export interface ISearchProps {
    initialData: ISearchData
    fields: ISearchField[]
    codes?: ICdProps[]
}

/**
 * 검색 조건 데이터 타입 정의
 * 이 인터페이스는 검색 조건을 사용할때 상속 받아 생성 해야 됨.
 */
export interface ISearchData {
    [key: string]: string
}

/**
 * 필드 옵션 타입 정의
 */
export type TFieldOptions =
    | {
          groupId: string
          useYn?: 'Y' | 'N'
          firstItem?: { label: string; value: string } // 첫번째 옵션 항목
          include?: string[]
          exclude?: never // [수정] include와 exclude 동시 사용 불가
      }
    | {
          groupId: string
          useYn?: 'Y' | 'N'
          firstItem?: { label: string; value: string } // 첫번째 옵션 항목
          include?: never
          exclude?: string[] // [수정] include와 exclude 동시 사용 불가
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
    type: 'text' | 'select' | 'radio'
    /**
     * 폼 타입이 select일 경우 옵션 값들
     */
    options?: TFieldOptions
}
