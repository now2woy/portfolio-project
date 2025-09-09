import { ReactNode } from 'react'
import { MutationFunction } from '@tanstack/react-query'

import { IFileComponentProps } from '@/types/components/FileType'

/**
 * 버튼 컴포넌트의 variant 타입 정의
 */
export type buttonVariantType = 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined

/**
 * MutationButton이 받을 props의 타입 정의
 */
export interface MutationButtonProps<TData, TError, TVariables> {
    /**
     * 버튼 안에 들어갈 내용 (텍스트, 아이콘 등)
     */
    children: ReactNode
    /**
     * 버튼 variant 타입
     */
    variant?: buttonVariantType
    /**
     * 버튼 class
     */
    className?: string
    /**
     * 실행할 뮤테이션 함수
     */
    mutationFn: MutationFunction<TData, TVariables>
    /**
     * 뮤테이션 함수에 전달할 인자
     */
    variables: TVariables
    /**
     * 컨펌 메시지
     */
    confirmMessage?: string
    /**
     * 성공 시 표시할 메시지
     */
    successMessage?: string
    /**
     * 실패 시 표시할 메시지
     */
    errorMessage?: string
    /**
     * 성공 시 무효화할 쿼리 키
     */
    queryKeyToInvalidate?: string[]
    /**
     * 성공 시 추가로 실행할 콜백
     * @param data
     * @returns
     */
    onSuccessCallback?: (data: TData) => void
    /**
     * 폼 객체
     */
    formRef?: React.RefObject<HTMLFormElement | null>
    /**
     * 첨부파일 정보
     */
    files?: IFileComponentProps
}

export interface ButtionAreaProps<TData = any, TError = any, TVariables = any> {
    /**
     * 버튼 명
     */
    name: string
    /**
     * 버튼 타입
     */
    type: 'link' | 'mutation'
    /**
     * 정렬
     */
    align: 'left' | 'right'
    /**
     * 보이기 여부
     */
    isVisibility: boolean
    /**
     * 버튼 variant 타입
     */
    variant?: buttonVariantType
    /**
     * 버튼 class
     */
    className?: string
    /**
     * 링크 타입의 URL
     */
    url?: string

    /** ---------------------- [추가: mutation 전용 props] ---------------------- */
    /**
     * 실행할 뮤테이션 함수
     */
    mutationFn?: MutationFunction<TData, TVariables>
    /**
     * 뮤테이션 함수에 전달할 인자
     */
    variables?: TVariables
    /**
     * 컨펌 메시지
     */
    confirmMessage?: string
    /**
     * 성공 시 표시할 메시지
     */
    successMessage?: string
    /**
     * 실패 시 표시할 메시지
     */
    errorMessage?: string
    /**
     * 성공 시 무효화할 쿼리 키
     */
    queryKeyToInvalidate?: string[]
    /**
     * 성공 시 추가로 실행할 콜백
     * @param data
     * @returns
     */
    onSuccessCallback?: (data: TData) => void
    /**
     * 폼 객체
     */
    formRef?: React.RefObject<HTMLFormElement | null>
    /**
     * 첨부파일 정보
     */
    files?: IFileComponentProps
}
