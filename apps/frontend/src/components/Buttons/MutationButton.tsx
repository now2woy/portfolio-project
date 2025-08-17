'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { MutationButtonProps } from '@/components/Buttons';

/**
 * 뮤테이션 처리하는 버튼
 * @param param
 * @returns 
 */
export function MutationButton<TData, TError, TVariables>({
    children,
    variant,
    className,
    mutationFn,
    variables,
    successMessage = '요청 처리에 성공하였습니다.',
    errorMessage = '요청 처리에 실패하였습니다.',
    queryKeyToInvalidate,
    onSuccessCallback,
    onErrorCallback,
    isSubmit = false,
}: MutationButtonProps<TData, TError, TVariables>) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn,
        onSuccess: (data) => {
            if (queryKeyToInvalidate) {
                queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
            }

            if (successMessage) {
                alert(successMessage);
            }

            if (onSuccessCallback) {
                onSuccessCallback(data);
            }
        },
        onError: (error: TError) => {
            if (errorMessage) {
                alert(errorMessage);
            }

            if (onErrorCallback) {
                onErrorCallback(error);
            }
        },
    });

    // 버튼 클릭 핸들링
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // 서브밋일 경우 폼 체크
        if (isSubmit) {
            const form = (e.currentTarget as HTMLButtonElement).form;
            // 브라우저 검증
            if (form && form.checkValidity()) {
                e.preventDefault();
            }
        }

        // 처리
        mutate(variables);
    };

    return (
        <Button
            type={isSubmit ? 'submit' : 'button'}
            variant={variant}
            className={className}
            onClick={ handleClick }
            disabled={isPending}
        >
            {isPending ? '처리 중...' : children}
        </Button>
    );
}
