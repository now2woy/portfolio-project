/**
 * 정적 테이블 컬럼 정의 Props
 */
export interface IStaticColumnProps<T> {
    /**
     * 컬럼의 키
     */
    key: keyof T
    /**
     * 제목 셀에 표시할 명칭
     */
    label: string
    /**
     * 정렬, 넓이 등을 정의하는 클래스 명
     */
    className?: string
    /**
     * 링크 URL
     */
    linkUrl?: string
    /**
     * 링크 URL을 조합할 때 사용할 키들의 배열 (옵션)
     */
    linkKeys?: (keyof T)[]
}

/**
 * 정적 테이블 정의 Props
 */
export interface IStaticTableProps<T> {
    data: T[]
    columns: IStaticColumnProps<T>[]
    title: string
}

/**
 * 드래그 & 드랍 테이블 컬럼 정의 Props
 */
export interface IDndColumnProps<T> {
    key: keyof T | string
    label: string
    className?: string
    linkUrl?: string
    linkKeys?: (keyof T)[]
    isDndColumn?: boolean
    inputType?: 'text' | 'readonly' | 'select' | 'checkbox'
}

/**
 * 정렬테이블 행 정의 Porps
 */
export interface ISortableTableRowProps<T> {
    row: T
    columns: IDndColumnProps<T>[]
    idKey: keyof T
    onUpdate: (id: string, key: keyof T, value: unknown) => void
    onRemoveRow?: (id: string) => void
}

/**
 * 드래그 & 드랍 테이블 정의
 */
export interface IDndTableProps<T> {
    data: T[]
    columns: IDndColumnProps<T>[]
    idKey: keyof T
    title: string
    onDragEnd: (items: T[]) => void
    onUpdate: (id: string, key: keyof T, value: unknown) => void
    onAddRow?: () => void
    onRemoveRow?: (id: string) => void
}
