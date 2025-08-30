import React from 'react'
import { cn } from '@/lib/utils' // cn 함수는 Tailwind CSS 클래스를 병합합니다.
import { IStaticViewProps } from '@/types/components/ViewType'

/**
 * 정적 상세 보기 화면
 * @param param
 * @returns
 */
export function StaticDetailViewer<T extends Record<string, unknown>>({
    data,
    fields,
    children
}: IStaticViewProps<T>) {
    return (
        <div className="border-gray-250 rounded-lg border px-6">
            <dl className="grid grid-cols-1 gap-x-4 sm:grid-cols-6">
                {fields.map(field => (
                    <div
                        key={String(field.key)}
                        className={cn(
                            'px-4 pt-4 pb-2 sm:px-0',
                            `sm:col-span-${field.colSpan}`,
                            field.hasBorderTop && 'border-t'
                        )}>
                        <dt className="text-sm leading-6 font-semibold">
                            {field.label}
                        </dt>
                        <dd className="text-muted-foreground mt-1 mt-2 text-sm leading-6">
                            {field.render
                                ? field.render(data[field.key], data)
                                : String(data[field.key] ?? '')}
                        </dd>
                    </div>
                ))}
            </dl>
            {children && (
                <div className="border-t px-4 pt-4 pb-2 sm:col-span-6 sm:px-0">
                    {children}
                </div>
            )}
        </div>
    )
}
