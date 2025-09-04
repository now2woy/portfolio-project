'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/Files/FileUpload'

import { FormViewerProps } from '@/types/components/ViewType'
import { IFileComponentProps } from '@/types/components/FileType'

/**
 * 데이터 입력 폼 뷰어 생성
 * @param param
 * @returns
 */
export function FormViewer<T extends Record<string, unknown>>({ data, fields, onUpdate, children }: FormViewerProps<T>) {
    const [formData, setFormData] = useState<T>(data)

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
                {fields.map(field => (
                    <div
                        key={field.key as string}
                        className={cn('px-4 pt-4 pb-2 sm:px-0', `sm:col-span-${field.colSpan}`, field.hasBorderTop && 'border-t')}>
                        <dt>
                            <Label
                                className="text-sm leading-6 font-semibold"
                                htmlFor={String(field.key)}>
                                {field.label}
                            </Label>
                        </dt>
                        <dd className="text-muted-foreground mt-1 mt-2 text-sm leading-6">
                            {
                                // render 함수가 있을 경우
                                field.render && field.render(formData[field.key], formData, handleFieldChange)
                            }
                            {
                                // render 함수가 없고, type 이 'text' 일 경우
                                !field.render && field.type === 'text' && (
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
                                // render 함수가 없고, type 이 'viewer' 일 경우
                                !field.render && field.type === 'viewer' && <span>{formData[field.key] ? String(formData[field.key]) : '-'}</span>
                            }
                            {
                                // render 함수가 없고, type 이 'textarea' 일 경우
                                !field.render && field.type === 'textarea' && (
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
                                // render 함수가 없고, type 이 'select' 일 경우
                                !field.render && field.type === 'select' && (
                                    <Select
                                        value={String(formData[field.key as string])}
                                        onValueChange={value =>
                                            setFormData({
                                                ...formData,
                                                [field.key as string]: value
                                            })
                                        }>
                                        <SelectTrigger
                                            id={field.key as string}
                                            className="w-full">
                                            <SelectValue placeholder="선택" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {field.options?.map(option => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )
                            }
                            {
                                // render 함수가 없고, type 이 'file' 일 경우
                                !field.render && field.type === 'file' && (
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
                        </dd>
                    </div>
                ))}

                <div className="border-t px-4 pt-4 pb-2 sm:col-span-6 sm:px-0">{children}</div>
            </dl>
        </div>
    )
}
