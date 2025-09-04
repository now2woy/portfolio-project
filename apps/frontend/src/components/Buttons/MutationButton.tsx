'use client'

import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { uploadAtchFileViaBff } from '@/services/client/FileClientService'

import { MutationButtonProps } from '@/types/components/ButtonType'
import { IFileComponentProps } from '@/types/components/FileType'

/**
 * 첨부파일 업로드 API (공통 관리 모듈)
 * @returns
 */
async function uploadAttachFiles(files?: IFileComponentProps): Promise<number> {
    let isUpdate = false

    const formData = new FormData()

    if (files?.atchFileId) {
        formData.append('atchFileId', files.atchFileId.toString())
    }

    if (files?.uploadFiles && files.uploadFiles.length > 0) {
        files.uploadFiles.forEach(file => formData.append('files', file))
        isUpdate = true
    }

    // 삭제할 파일 → DTO 구조에 맞게 Blob으로 감싸서 전달
    if (files?.deleteFiles && files.deleteFiles.length > 0) {
        formData.append(
            'deletefiles',
            new Blob([JSON.stringify(files.deleteFiles)], {
                type: 'application/json'
            })
        )
        isUpdate = true
    }

    let data = files?.atchFileId || 0

    // 처리할 데이터가 있을 경우
    if (isUpdate) {
        data = await uploadAtchFileViaBff({ data: formData })
    }

    return data
}

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
    files
}: MutationButtonProps<TData, TError, TVariables>) {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async () => {
            let finalVariables = variables

            if (files) {
                try {
                    const atchFileId = await uploadAttachFiles(files)

                    // 첨부파일ID가 0일 경우 처리할 필요 없음
                    if (atchFileId !== 0) {
                        // fileKeys를 variables에 추가
                        finalVariables = {
                            ...variables,
                            atchFileId: atchFileId
                        }
                    }
                } catch (e) {
                    // 첨부파일 업로드 실패 시, useMutation의 onError로 오류를 전달
                    const error = new Error(
                        '첨부파일 업로드 중 오류가 발생했습니다.'
                    ) as TError
                    throw error
                }
            }
            // `mutationFn`에 variables를 인자로 전달하지 않으므로 직접 호출
            return mutationFn(finalVariables)
        },
        onSuccess: data => {
            if (queryKeyToInvalidate) {
                if (queryKeyToInvalidate[0] === 'ALL') {
                    queryClient.invalidateQueries()
                } else {
                    queryClient.invalidateQueries({
                        queryKey: queryKeyToInvalidate
                    })
                }
            }

            // 성공 메시지 출력
            if (successMessage) {
                alert(successMessage)
            }

            // 성공 후속 처리 호출
            if (onSuccessCallback) {
                onSuccessCallback(data)
            }
        },
        onError: (error: TError) => {
            // 오류 메시지 출력
            if (errorMessage) {
                alert(errorMessage)
            }

            // 오류 후속 처리 호출
            if (onErrorCallback) {
                onErrorCallback(error)
            }
        }
    })

    // **[수정]** handleMutation 로직 제거 및 mutateAsync 호출로 변경
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // 서브밋일 경우 폼 체크
        if (isSubmit) {
            const form = (e.currentTarget as HTMLButtonElement).form
            // 브라우저 검증
            if (form && form.checkValidity()) {
                // 서브밋 이벤트 중단
                e.preventDefault()
                // 처리
                await mutateAsync()
            }
        } else {
            // 처리
            await mutateAsync()
        }
    }

    return (
        <Button
            type={isSubmit ? 'submit' : 'button'}
            variant={variant}
            className={cn('cursor-pointer', className)}
            onClick={handleClick}
            disabled={isPending}>
            {isPending ? '처리 중...' : children}
        </Button>
    )
}
