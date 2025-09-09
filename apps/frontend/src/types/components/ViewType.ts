import { TFieldOptions } from '@/types/components/SearchType'
import { ICdProps } from '@/types/apps/CdGroupType'

/**
 *
 */
export interface IStaticViewProps<T> {
    data: T
    fields: IStaticFieldProps<T>[]
    children?: React.ReactNode
}

/**
 * 데이터 조회 폼 타입 정의
 * 이 인터페이스는 데이터 조회 폼을 사용할때 상속 받아 생성 해야 됨.
 */
export interface IStaticFieldProps<T> {
    /**
     * 데이터 객체에서 값을 가져올 키
     */
    key: keyof T
    /**
     * 필드의 제목
     */
    label: string
    /**
     * 필드가 차지할 컬럼 수 (3, 6)
     */
    colSpan: 3 | 6
    /**
     * `border-t`를 추가할지 여부
     */
    hasBorderTop?: boolean
    /**
     * 값을 커스텀 렌더링할 함수 (선택 사항)
     */
    render?: (value: T[keyof T], item: T) => React.ReactNode
    /**
     * 보기 여부
     */
    isVisibility?: boolean
}

/**
 *
 */
export interface FormViewerProps<T> {
    data: T
    fields: IFormFieldProps<T>[]
    codes?: ICdProps[]
    onUpdate: (updatedData: T) => void
    children?: React.ReactNode
}

/**
 * 데이터 입력 폼 타입 정의
 * 이 인터페이스는 데이터 입력 폼을 사용할때 상속 받아 생성 해야 됨.
 */
export interface IFormFieldProps<T> {
    /**
     * 필드의 제목
     */
    label: string
    /**
     * 데이터 객체에서 값을 가져올 키
     */
    key: keyof T
    /**
     * 필드가 차지할 컬럼 수 (3, 6)
     */
    colSpan: 3 | 6
    /**
     * `border-t`를 추가할지 여부
     */
    hasBorderTop?: boolean
    /**
     * 폼 필드의 타입 (예: 'text', 'textarea', 'select', 'viewer' 등)
     * 'viewer'는 뷰 전용 필드를 나타냅니다.
     */
    type?: 'text' | 'textarea' | 'viewer' | 'select' | 'radio' | 'file' | 'tiptap'
    /**
     * 데이터 타입
     */
    dataType?: 'string' | 'number' | 'date'
    /**
     * 필드의 필수 여부
     */
    required?: boolean
    /**
     * 필드의 포멧
     */
    format?: string
    /**
     * 폼 타입이 select일 경우 옵션 값들
     */
    options?: TFieldOptions
    /**
     * 보기 여부
     */
    isVisibility?: boolean
}
