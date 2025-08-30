import { ReactNode } from 'react';
import { MutationFunction } from '@tanstack/react-query';

/**
 * 버튼 컴포넌트의 variant 타입 정의
 */
export type buttonVariantType = "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;

/**
 * MutationButton이 받을 props의 타입 정의
 */
export interface MutationButtonProps<TData, TError, TVariables> {
    // 버튼 안에 들어갈 내용 (텍스트, 아이콘 등)
    children : ReactNode;
    // 버튼 variant 타입
    variant? : buttonVariantType;
    // 버튼 class
    className? : string;
    // 실행할 뮤테이션 함수
    mutationFn: MutationFunction<TData, TVariables>;
    // 뮤테이션 함수에 전달할 인자
    variables: TVariables;
    // 성공 시 표시할 메시지
    successMessage?: string;
    // 실패 시 표시할 메시지
    errorMessage?: string;
    // 성공 시 무효화할 쿼리 키
    queryKeyToInvalidate?: string[];
    // 성공 시 추가로 실행할 콜백
    onSuccessCallback?: (data: TData) => void;
    // 실패 시 추가로 실행할 콜백
    onErrorCallback?: (error: TError) => void;
    // 서브밋 버튼 여부
    isSubmit?: boolean;
}