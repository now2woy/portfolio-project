/**
 * 
 */
export interface IStaticViewProps<T,> {
    data: T;
    fields: IStaticFieldProps<T>[];
    children?: React.ReactNode;
}

/**
 * 
 */
export interface IStaticFieldProps<T> {
    /**
     * 데이터 객체에서 값을 가져올 키
     */
    key: keyof T;
    /**
     * 필드의 제목
     */
    label: string;
    /**
     * 필드가 차지할 컬럼 수 (1-6)
     */
    colSpan: 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * `border-t`를 추가할지 여부
     */
    hasBorderTop?: boolean;
    /**
     * 값을 커스텀 렌더링할 함수 (선택 사항)
     */
    render?: (value : T[ keyof T ], item : T) => React.ReactNode;
}

/**
 * 
 */
export interface FormViewerProps<T> {
    data: T;
    fields: IFormFieldProps<T>[];
    onUpdate: (updatedData: T) => void;
    children?: React.ReactNode;
}

/**
 * 
 */
export interface IFormFieldProps<T> {
    /**
     * 필드의 제목
     */
    label: string;
    /**
     * 데이터 객체에서 값을 가져올 키
     */
    key: keyof T;
    /**
     * 필드가 차지할 컬럼 수 (1-6)
     */
    colSpan: 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * `border-t`를 추가할지 여부
     */
    hasBorderTop?: boolean;
    /**
     * 값을 커스텀 렌더링할 함수 (선택 사항).
     * 폼 입력 컴포넌트를 렌더링하거나, 뷰 전용 필드를 렌더링할 때 사용합니다.
     */
    render?: ( value : T[keyof T], item : T, onFieldChange?: ( key : keyof T, newValue : unknown ) => void ) => React.ReactNode;
    /**
     * 폼 필드인지 여부
     */
    isForm?: boolean;
    /**
     * 폼 필드의 타입 (예: 'text', 'textarea', 'select', 'viewer' 등)
     * 'viewer'는 뷰 전용 필드를 나타냅니다.
     */
    formType?: 'text' | 'textarea' | 'viewer';
    /**
     * 필드의 필수 여부
     */
    required?: boolean;
}