/**
 * 페이지 요청 인터페이스
 */
export interface IPageable {
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
}

/**
 * 페이지 응답 인터페이스
 */
export interface IPageResponse<T> {
    content: T[]
    pageable: IPageable
    totalPages: number
    totalElements: number
    last: boolean
    first: boolean
    size: number
    number: number
    sort: {
        sorted: boolean
        unsorted: boolean
        empty: boolean
    }
    numberOfElements: number
    empty: boolean
}
