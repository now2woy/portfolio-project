"use client";

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { FormViewerProps } from '@/types/components/ViewType';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * 
 * @param param
 * @returns 
 */
export function FormViewer<T extends Record<string, unknown>>({ data, fields, onUpdate, children }: FormViewerProps<T>) {
    const [ formData, setFormData ] = useState<T>( data );

    // 외부에서 props.data가 변경될 때마다 내부 상태를 동기화합니다.
    useEffect(() => {
        setFormData( data );
    }, [data]);

    const handleFieldChange = ( key : keyof T, value: unknown ) => {
        const updatedData = { ...formData, [ key ]: value };
        setFormData( updatedData );
        onUpdate( updatedData );
    };

    return (
        <div className="border border-gray-250 rounded-lg px-6">
            <dl className="grid grid-cols-1 sm:grid-cols-6 gap-x-4">
                { fields.map(( field ) => (
                    <div key={ String( field.key ) } className={ cn( "pb-2 pt-4 px-4 sm:px-0", `sm:col-span-${field.colSpan}`, field.hasBorderTop && "border-t" ) } >
                        <dt>
                            <Label className="text-sm leading-6 font-semibold" htmlFor={ String( field.key ) }>{ field.label }</Label>
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground mt-2">
                            { field.render ? field.render( formData[ field.key ], formData, handleFieldChange ) : (
                                // isForm이 true이면 기본 Input 컴포넌트 렌더링
                                field.formType === 'text' ? (
                                    <Input
                                        id={ String( field.key ) }
                                        name={ String( field.key ) }
                                        required={ field.required }
                                        value={ String( formData[ field.key ] || '' ) }
                                        onChange={ ( e ) => handleFieldChange( field.key, e.target.value ) }
                                    />
                                ) : (
                                    // 뷰 전용 필드
                                    <span>{ String( formData[ field.key ] ) }</span>
                                )
                            )}
                        </dd>
                    </div>
                ))}

                <div className="border-t pb-2 pt-4 px-4 sm:px-0 sm:col-span-6">
                    { children }
                </div>
            </dl>
        </div>
    );
}