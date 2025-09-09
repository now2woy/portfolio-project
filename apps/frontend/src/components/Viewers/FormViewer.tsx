'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/Inputs/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/Files/FileUpload'
import { formatDate } from '@/utils/DateUtils'

import { FormViewerProps } from '@/types/components/ViewType'
import { IFileComponentProps } from '@/types/components/FileType'

/**
 * TiptapEditor를 클라이언트 측에서 다이나믹 로드
 */
const TiptapEditor = dynamic(() => import('@/components/TipTaps').then(mod => mod.TiptapEditor), {
    ssr: false, // 서버 측 렌더링을 비활성화
    loading: () => null // 로딩 중 보여줄 컴포넌트
})

/**
 * 데이터 입력 폼 뷰어 생성
 * @param param
 * @returns
 */
export function FormViewer<T extends Record<string, unknown>>({ data, fields, codes, onUpdate, children }: FormViewerProps<T>) {
    const [formData, setFormData] = useState<T>(data)
    const visibleFields = fields.filter(field => field.isVisibility != false)

    // 외부에서 props.data가 변경될 때마다 내부 상태를 동기화합니다.
    useEffect(() => {
        setFormData(data)
    }, [data])

    // 필드의 값이 변경 될 때
    const handleFieldChange = (key: keyof T, value: unknown) => {
        const updatedData = { ...formData, [key]: value }
        setFormData(updatedData)
        onUpdate(updatedData)
    }

    return (
        <div className="border-gray-250 rounded-lg border px-6">
            <dl className="grid grid-cols-1 gap-x-4 sm:grid-cols-6">
                {visibleFields.map(field => (
                    <div
                        key={field.key as string}
                        className={cn('px-4 pt-4 pb-2 sm:px-0', `sm:col-span-${field.colSpan}`, field.hasBorderTop != false && 'border-t')}>
                        <dt>
                            <Label
                                className="text-sm leading-6 font-semibold"
                                htmlFor={String(field.key)}>
                                {field.label}
                            </Label>
                        </dt>
                        <dd className="text-muted-foreground mt-1 mt-2 text-sm leading-6">
                            {
                                // type 이 'text' 일 경우
                                field.type === 'text' && (
                                    <Input
                                        id={String(field.key)}
                                        name={String(field.key)}
                                        required={field.required}
                                        value={String(formData[field.key] || '')}
                                        onChange={e => handleFieldChange(field.key, e.target.value)}
                                    />
                                )
                            }
                            {
                                // type 이 'viewer' 일 경우
                                field.type === 'viewer' && (field.format ? formatDate(formData[field.key] ? String(formData[field.key]) : '-', field.format) : <span>{formData[field.key] ? String(formData[field.key]) : '-'}</span>)
                            }
                            {
                                // type 이 'textarea' 일 경우
                                field.type === 'textarea' && (
                                    <Textarea
                                        id={String(field.key)}
                                        name={String(field.key)}
                                        required={field.required}
                                        value={String(formData[field.key] || '')}
                                        onChange={e => handleFieldChange(field.key, e.target.value)}
                                    />
                                )
                            }
                            {
                                // type 이 'select' 일 경우
                                field.type === 'select' && (
                                    <Select
                                        value={String(formData[field.key as string])}
                                        onValueChange={value => handleFieldChange(field.key, value)}>
                                        <SelectTrigger
                                            id={field.key as string}
                                            className="w-full">
                                            <SelectValue placeholder="선택" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {codes
                                                ?.filter(cd => {
                                                    // 1. groupId 매칭
                                                    if (cd.groupId !== field.options?.groupId) return false

                                                    // 2. useYn 로직
                                                    if ((field.options?.useYn === undefined || field.options?.useYn === 'Y') && cd.useYn !== 'Y') return false
                                                    // useYn === 'N' 인 경우 Y/N 둘 다 허용 → 조건 불필요
                                                    // useYn이 없으면 전체 허용

                                                    // 3. include / exclude 로직
                                                    if (field.options?.include) {
                                                        return field.options.include.includes(cd.cdId)
                                                    }
                                                    if (field.options?.exclude) {
                                                        return !field.options.exclude.includes(cd.cdId)
                                                    }

                                                    return true
                                                })
                                                .sort((a, b) => a.sortOrdr - b.sortOrdr)
                                                .map(cd => (
                                                    <SelectItem
                                                        key={cd.cdId}
                                                        value={cd.cdId}>
                                                        {cd.cdNm}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                )
                            }
                            {
                                /** 라디오 필드 일 경우 */
                                field.type === 'radio' && (
                                    <RadioGroup
                                        value={String(formData[field.key as string])}
                                        onValueChange={value => handleFieldChange(field.key, value)}>
                                        {field.options?.firstItem && (
                                            <div className="flex gap-3">
                                                <RadioGroupItem
                                                    key={field.options?.firstItem.label}
                                                    value={field.options?.firstItem.value}
                                                    id={(field.key as string) + 'ALL'}
                                                    className="cursor-pointer"
                                                />
                                                <Label
                                                    htmlFor={(field.key as string) + 'ALL'}
                                                    className="cursor-pointer">
                                                    {' '}
                                                    {field.options?.firstItem.label}{' '}
                                                </Label>
                                            </div>
                                        )}
                                        {codes
                                            ?.filter(cd => {
                                                // 1. groupId 매칭
                                                if (cd.groupId !== field.options?.groupId) return false

                                                // 2. useYn 로직
                                                if ((field.options?.useYn === undefined || field.options?.useYn === 'Y') && cd.useYn !== 'Y') return false
                                                // useYn === 'N' 인 경우 Y/N 둘 다 허용 → 조건 불필요
                                                // useYn이 없으면 전체 허용

                                                // 3. include / exclude 로직
                                                if (field.options?.include) {
                                                    return field.options.include.includes(cd.cdId)
                                                }
                                                if (field.options?.exclude) {
                                                    return !field.options.exclude.includes(cd.cdId)
                                                }

                                                return true
                                            })
                                            .sort((a, b) => a.sortOrdr - b.sortOrdr)
                                            .map(cd => (
                                                <div className="flex gap-3">
                                                    <RadioGroupItem
                                                        key={cd.cdId}
                                                        value={cd.cdId}
                                                        id={(field.key as string) + cd.cdId}
                                                        className="cursor-pointer"
                                                    />
                                                    <Label
                                                        htmlFor={(field.key as string) + cd.cdId}
                                                        className="cursor-pointer">
                                                        {cd.cdNm}
                                                    </Label>
                                                </div>
                                            ))}
                                    </RadioGroup>
                                )
                            }
                            {
                                // type 이 'file' 일 경우
                                field.type === 'file' && (
                                    <FileUpload
                                        atchFiles={formData[field.key] as IFileComponentProps}
                                        handleAtachFiles={(uploadFiles, deleteFiles) => {
                                            handleFieldChange(field.key, {
                                                ...(formData[field.key] as IFileComponentProps),
                                                uploadFiles,
                                                deleteFiles
                                            })
                                        }}
                                    />
                                )
                            }
                            {
                                // type 이 'tiptap' 일 경우
                                field.type === 'tiptap' && (
                                    <TiptapEditor
                                        content={formData[field.key] as string}
                                        onUpdate={newValue => handleFieldChange(field.key, newValue)}
                                    />
                                )
                            }
                        </dd>
                    </div>
                ))}

                {children && <div className="border-t px-4 pt-4 pb-2 sm:col-span-6 sm:px-0">{children}</div>}
            </dl>
        </div>
    )
}
