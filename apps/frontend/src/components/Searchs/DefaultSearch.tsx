'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw } from 'lucide-react';
import { ISearchProps, ISearchData } from "@/types/components/SearchType"

/**
 * 기본 검색 컴포넌트
 * @param param
 * @returns 
 */
export const DefaultSearch = ( { initialData, fields }: ISearchProps ) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [ filters, setFilters ] = useState< ISearchData >( initialData );

    // 검색 파라미터가 변경될 때마다 필터를 업데이트
    useEffect( () => {
        let hasChange = false;
        const updated = { ...initialData };

        fields.forEach( field => {
            const paramValue = searchParams?.get( field.value as string );
            
            if ( paramValue ) {
                updated[ field.value as string ] = paramValue;
                hasChange = true;
            }
        });

        if ( hasChange ) {
            setFilters( updated );
            
        // 파라미터 없으면 초기화
        } else {
            setFilters( initialData );
        }
    }, [ searchParams, fields, initialData ] );


    // 조회 버튼 헨들러
    const handleSearch = ( filters : ISearchData ) => {
        const params = new URLSearchParams(searchParams);
        Object.keys( filters ).forEach( key => {
            if ( filters[ key ] ) {
                params.set( key, filters[ key ] );
            } else {
                params.delete( key );
            }
        });

        router.push(`?${ params.toString() }`);
    }
    
    return (
        <div className="border border-gray-250 rounded-lg p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-6 gap-x-4">
                { fields.map( ( field ) => (
                <div key={ field.value as string } className="px-4 sm:col-span-3 sm:px-0">
                    <dt><Label htmlFor={ field.value as string } className="text-sm leading-6 font-semibold">{ field.label }</Label></dt>
                    <dd className="mt-1 text-sm leading-6 text-muted-foreground mt-2">

                        {/** 텍스트 필드 일 경우 */
                        field.type === 'text' && (
                            <Input id={ field.value as string } className="mb-4" value={ filters[ field.value as string ] }
                                onChange={ ( e ) => setFilters( { ...filters, [field.value as string]: e.target.value } ) }
                                onKeyDown={ ( e ) => {
                                    if ( e.key === 'Enter' ) {
                                        handleSearch( filters );
                                    }
                                } }
                             />
                        ) }

                        {/** 셀렉트 필드 일 경우 */
                        field.type === 'select' && (
                            <Select defaultValue={ filters[ field.value as string ] } onValueChange={ ( value ) => setFilters( { ...filters, [field.value as string]: value } ) } >
                                <SelectTrigger id={ field.value as string } className="w-full">
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
                        ) }
                    </dd>
                </div>
                ) ) }
            </dl>
            <div className="grid grid-cols-2 pt-4">
                <div className="w-full flex items-center gap-2">
                </div>
                <div className="w-full flex items-center justify-end gap-2">
                    <Button variant="outline" className="cursor-pointer" onClick={ () => setFilters( initialData ) }><RotateCcw className="h-4 w-4" /></Button>
                    <Button className="text-white cursor-pointer" onClick={ () => handleSearch( filters ) }>조회</Button>
                </div>
            </div>
        </div>
    );
};