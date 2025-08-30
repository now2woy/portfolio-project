"use client";

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';

import { FormViewerProps } from '@/types/components/ViewType';

/**
 * 데이터 입력 폼 뷰어 생성
 * @param param
 * @returns 
 */
export function FormViewer<T extends Record<string, unknown>>( { data, fields, onUpdate, children } : FormViewerProps<T> ) {
    const [ formData, setFormData ] = useState<T>( data );

    // 외부에서 props.data가 변경될 때마다 내부 상태를 동기화합니다.
    useEffect( () => {
        setFormData( data );
    }, [ data ] );

    // 필드의 값이 변경 될 때
    const handleFieldChange = ( key : keyof T, value: unknown ) => {
        const updatedData = { ...formData, [ key ]: value };
        setFormData( updatedData );
        onUpdate( updatedData );
    };

    return (
        <div className="border border-gray-250 rounded-lg px-6">
            <dl className="grid grid-cols-1 sm:grid-cols-6 gap-x-4">
                { fields.map(( field ) => (
                    <div key={ field.key as string } className={ cn( "pb-2 pt-4 px-4 sm:px-0", `sm:col-span-${field.colSpan}`, field.hasBorderTop && "border-t" ) } >
                        <dt>
                            <Label className="text-sm leading-6 font-semibold" htmlFor={ String( field.key ) }>{ field.label }</Label>
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground mt-2">
                            { // render 함수가 있을 경우
                                field.render && field.render( formData[ field.key ], formData, handleFieldChange )
                            }
                            { // render 함수가 없고, type 이 'text' 일 경우
                                !field.render && field.type === 'text' && (
                                    <Input
                                        id={ String( field.key ) }
                                        name={ String( field.key ) }
                                        required={ field.required }
                                        value={ String( formData[ field.key ] || '' ) }
                                        onChange={ ( e ) => handleFieldChange( field.key, e.target.value ) }
                                    />
                                )
                            }
                            { // render 함수가 없고, type 이 'viewer' 일 경우
                                !field.render && field.type === 'viewer' && (
                                        <span>{ formData[ field.key ] ? String( formData[ field.key ] ) : '-' }</span>
                                )
                            }
                            { // render 함수가 없고, type 이 'textarea' 일 경우
                                !field.render && field.type === 'textarea' && (
                                    <Textarea
                                        id={ String( field.key ) }
                                        name={ String( field.key ) }
                                        required={ field.required }
                                        value={ String( formData[ field.key ] || '' ) }
                                        onChange={ ( e ) => handleFieldChange( field.key, e.target.value ) }
                                    />
                                )
                            }
                            { // render 함수가 없고, type 이 'select' 일 경우
                                !field.render && field.type === 'select' && (
                                    <Select value={ String( formData[ field.key as string ] ) } onValueChange={ ( value ) => setFormData( { ...formData, [ field.key as string ] : value } ) } >
                                        <SelectTrigger id={ field.key as string } className="w-full">
                                            <SelectValue placeholder="선택" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            { field.options?.map( option => (
                                            <SelectItem key={ option.value } value={ option.value }>
                                                { option.label }
                                            </SelectItem>
                                            ) ) }
                                        </SelectContent>
                                    </Select>
                                )
                            }
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