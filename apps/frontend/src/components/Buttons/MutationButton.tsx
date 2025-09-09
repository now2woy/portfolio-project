'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadAtchFileViaBff } from '@/services/client/FileClientService'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { MutationButtonProps } from '@/types/components/ButtonType'
import { IFileComponentProps } from '@/types/components/FileType'

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
    confirmMessage,
    successMessage = '요청 처리에 성공하였습니다.',
    errorMessage = '요청 처리에 실패하였습니다.',
    queryKeyToInvalidate,
    onSuccessCallback,
    formRef,
    files
}: MutationButtonProps<TData, TError, TVariables>) {
    // MutationButton 컴포넌트 내부
    const [isMainDialogOpen, setIsMainDialogOpen] = useState(false)
    const [isResultDialogOpen, setIsResultDialogOpen] = useState(false)
    const [resultMessage, setResultMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [mutationData, setMutationData] = useState<TData>()
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
                    const error = new Error('첨부파일 업로드 중 오류가 발생했습니다.') as TError
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
            // 성공 시
            setHasError(false)
            setIsMainDialogOpen(false)
            setResultMessage(successMessage)
            setMutationData(data)
            setIsResultDialogOpen(true) // 결과 다이얼로그를 엽니다.
        },
        onError: (error: TError) => {
            // 실패 시
            setHasError(true)
            setIsMainDialogOpen(false)
            setResultMessage(errorMessage)
            setIsResultDialogOpen(true) // 결과 다이얼로그를 엽니다.
        }
    })

    // **[수정]** handleMutation 로직 제거 및 mutateAsync 호출로 변경
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // 서브밋일 경우 폼 체크
        if (formRef) {
            const form = formRef.current

            // 브라우저 검증
            if (form && form.checkValidity()) {
                // 서브밋 이벤트 중단
                e.preventDefault()
                // 처리
                await mutateAsync()
            } else {
                // TODO 벨리데이션을 어떻게 할지 고민 해 보자
                setHasError(true)
                setIsMainDialogOpen(false)
                setResultMessage('필수 항목 중 입력하지 않은 값이 있습니다.')
                setIsResultDialogOpen(true)
            }
        } else {
            // 처리
            await mutateAsync()
        }
    }

    // MutationButton 컴포넌트 내부
    const handleResultOk = () => {
        // 1. 결과 다이얼로그를 닫습니다.
        setIsResultDialogOpen(false)

        // 2. 오류가 없고 onSuccessCallback 함수가 정의되어 있으면 실행합니다.
        if (!hasError && mutationData && onSuccessCallback) {
            onSuccessCallback(mutationData)
        }
    }

    return (
        <>
            {confirmMessage ? (
                <Button
                    type="button"
                    variant={variant}
                    className={cn('cursor-pointer', className)}
                    onClick={() => setIsMainDialogOpen(true)}>
                    {children}
                </Button>
            ) : (
                <Button
                    type={formRef ? 'submit' : 'button'}
                    variant={variant}
                    className={cn('cursor-pointer', className)}
                    onClick={handleClick}
                    disabled={isPending}>
                    {isPending ? '처리 중...' : children}
                </Button>
            )}

            <Dialog
                open={isMainDialogOpen}
                onOpenChange={open => {
                    setIsMainDialogOpen(open)
                }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>확인</DialogTitle>
                        <DialogDescription>{confirmMessage}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type={formRef ? 'submit' : 'button'}
                            variant={variant}
                            className={cn('cursor-pointer', className)}
                            onClick={handleClick}
                            disabled={isPending}>
                            확인
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsMainDialogOpen(false)}>
                            취소
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog
                open={isResultDialogOpen}
                onOpenChange={open => {
                    setIsResultDialogOpen(open)
                    // 닫힐 때 onClick(확인 버튼)과 동일 동작 실행
                    if (!open) {
                        handleResultOk()
                    }
                }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{hasError ? '오류' : '알림'}</DialogTitle>
                        <DialogDescription>{resultMessage}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleResultOk}>확인</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

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
