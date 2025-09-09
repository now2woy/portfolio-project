'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/Inputs/radio-group'
import { RotateCcw } from 'lucide-react'
import { ISearchProps, ISearchData } from '@/types/components/SearchType'

/**
 * 기본 검색 컴포넌트
 * @param param
 * @returns
 */
export const DefaultSearch = ({ initialData, fields, codes }: ISearchProps) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [filters, setFilters] = useState<ISearchData>(initialData)

    // 검색 파라미터가 변경될 때마다 필터를 업데이트
    useEffect(() => {
        let hasChange = false
        const updated = { ...initialData }

        fields.forEach(field => {
            const paramValue = searchParams?.get(field.key as string)

            if (paramValue) {
                updated[field.key as string] = paramValue
                hasChange = true
            }
        })

        if (hasChange) {
            setFilters(updated)

            // 파라미터 없으면 초기화
        } else {
            setFilters(initialData)
        }
    }, [searchParams, fields, initialData])

    // 조회 버튼 헨들러
    const handleSearch = (filters: ISearchData) => {
        const params = new URLSearchParams(searchParams)
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                params.set(key, filters[key])
            } else {
                params.delete(key)
            }
        })

        router.push(`?${params.toString()}`)
    }

    return (
        <div className="border-gray-250 rounded-lg border p-6">
            <dl className="grid grid-cols-1 gap-x-4 sm:grid-cols-6">
                {fields.map(field => (
                    <div
                        key={field.key as string}
                        className="px-4 sm:col-span-3 sm:px-0">
                        <dt>
                            <Label
                                htmlFor={field.key as string}
                                className="text-sm leading-6 font-semibold">
                                {field.label}
                            </Label>
                        </dt>
                        <dd className="text-muted-foreground mt-1 mt-2 text-sm leading-6">
                            {
                                /** 텍스트 필드 일 경우 */
                                field.type === 'text' && (
                                    <Input
                                        id={field.key as string}
                                        className="mb-4"
                                        value={filters[field.key as string]}
                                        onChange={e =>
                                            setFilters({
                                                ...filters,
                                                [field.key as string]: e.target.value
                                            })
                                        }
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                handleSearch(filters)
                                            }
                                        }}
                                    />
                                )
                            }

                            {
                                /** 셀렉트 필드 일 경우 */
                                field.type === 'select' && (
                                    <Select
                                        value={filters[field.key as string]}
                                        onValueChange={value => setFilters({ ...filters, [field.key as string]: value })}>
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
                                        value={filters[field.key as string]}
                                        onValueChange={value => setFilters({ ...filters, [field.key as string]: value })}>
                                        {field.options?.firstItem && (
                                            <div className="flex gap-3">
                                                <RadioGroupItem
                                                    key={field.options?.firstItem.label}
                                                    value={field.options?.firstItem.value}
                                                    id={field.key + 'ALL'}
                                                    className="cursor-pointer"
                                                />
                                                <Label
                                                    htmlFor={field.key + 'ALL'}
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
                                                <div
                                                    key={cd.cdId + 'div'}
                                                    className="flex gap-3">
                                                    <RadioGroupItem
                                                        key={cd.cdId}
                                                        value={cd.cdId}
                                                        id={field.key + cd.cdId}
                                                        className="cursor-pointer"
                                                    />
                                                    <Label
                                                        htmlFor={field.key + cd.cdId}
                                                        className="cursor-pointer">
                                                        {cd.cdNm}
                                                    </Label>
                                                </div>
                                            ))}
                                    </RadioGroup>
                                )
                            }
                        </dd>
                    </div>
                ))}
            </dl>
            <div className="grid grid-cols-2 pt-4">
                <div className="flex w-full items-center gap-2"></div>
                <div className="flex w-full items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => setFilters(initialData)}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                        className="cursor-pointer text-white"
                        onClick={() => handleSearch(filters)}>
                        조회
                    </Button>
                </div>
            </div>
        </div>
    )
}
