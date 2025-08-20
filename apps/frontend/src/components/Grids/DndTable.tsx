'use client';

import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, MinusCircle, PlusCircle } from 'lucide-react';
import { IDndTableProps, ISortableTableRowProps } from '@/types/components/GridType';

/**
 * 정렬 테이블 행 생성
 * @param param
 * @returns 
 */
function SortableTableRow<T>( { row, columns, idKey, onUpdate, onRemoveRow } : ISortableTableRowProps<T> ) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable( { id : String( row[ idKey ] ) } );
    const [ editingCell, setEditingCell ] = useState<keyof T | null>( null );

    const style = {
        transform: CSS.Transform.toString( transform ),
        transition,
    };

    // 수정여부 헨들러
    const handleEditClick = ( key : keyof T ) => {
        const currentColumn = columns.find( col => col.key === key );

        // 수정중인 셀렉트 박스는 변경하지 않는다.
        if ( editingCell === key && currentColumn?.inputType === 'select' ) {
           return;
        }

        setEditingCell( key );
    };
    
    // 삭제 버튼 핸들러
    const handleRemoveClick = () => {
        if ( onRemoveRow ) {
            onRemoveRow( String( row[ idKey ] ) );
        }
    };

    return (
        <TableRow ref={ setNodeRef } style={ style }>
        { columns.map( ( column ) => {
            // 드래그 & 드랍 아이콘
            if ( column.key === 'dndHandler' ) {
                return (
                    <TableCell key={ column.key } className={ column.className }>
                        <div {...attributes } { ...listeners } className="cursor-grab p-2">
                            <GripVertical className="h-4 w-4 text-gray-400" />
                        </div>
                    </TableCell>
                );

            // 마이너스 버튼
            } else if ( column.key === 'minusButton' ) {
                return (
                    <TableCell key={ column.key } className={ column.className }>
                        { onRemoveRow && columns[ columns.length - 1 ].key === column.key && (
                            <Button onClick={ handleRemoveClick } variant="ghost" className="text-gray-500" type="button"><MinusCircle className="h-4 w-4" /></Button>
                        ) }
                    </TableCell>
                );
            }
            
            // 'id'가 '_new_'로 시작하는지 확인
            const isNewRow = String( row[ 'isNew' as keyof T ] ) ?? false;
            const key = column.key as keyof T;

            // 드래그 & 드랍 아이콘이 아닐 경우
            return (
                <TableCell key={ String( column.key ) } className={ column.className }>
                    <div onClick={ () => column.inputType && handleEditClick( key ) } className={ `w-full py-2 px-4 ${ column.inputType && 'cursor-pointer' }` } >
                        { editingCell === key && column.inputType ? (
                            <div className="w-full">
                                { column.inputType === 'readonly' && (
                                    isNewRow ? (
                                        <Input defaultValue={ String( row[ key ] ) } autoFocus
                                            onBlur={ ( e ) => onUpdate( String( row[ idKey ] ), key, e.target.value ) }
                                            onKeyDown={ ( e ) => {
                                                if ( e.key === 'Enter' ) {
                                                    onUpdate( String( row[ idKey ] ), key, ( e.target as HTMLInputElement ).value );
                                                }
                                            } }
                                        />
                                    ) : (
                                        String( row[ key ] )
                                    )
                                )}

                                { column.inputType === 'text' && (
                                    <Input defaultValue={ String( row[ key ] ) } autoFocus
                                        onBlur={ ( e ) => onUpdate( String( row[ idKey ] ), key, e.target.value ) }
                                        onKeyDown={ ( e ) => {
                                            if ( e.key === 'Enter' ) {
                                                onUpdate( String( row[ idKey ] ), key, ( e.target as HTMLInputElement ).value );
                                            }
                                        } }
                                    />
                                ) }
                                {column.inputType === 'select' && (
                                    <Select defaultValue={ String( row[ key ] ) }
                                        onValueChange={ ( value ) => onUpdate( String( row[ idKey ] ), key, value ) }
                                        onOpenChange={ ( open ) => {
                                            if ( !open ) {
                                                setEditingCell( null );
                                            }
                                        } }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="선택" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Y">Y</SelectItem>
                                            <SelectItem value="N">N</SelectItem>
                                        </SelectContent>
                                    </Select>
                                ) }
                            </div>
                        ) : (
                            <div onClick={ () => column.inputType && handleEditClick( key ) } className={ `w-full py-2 px-4 ${ column.inputType && 'cursor-pointer' }` } >
                                {column.isDndColumn ? String(row[key]) : (
                                    column.linkUrl ? (
                                        <a href={ `${ column.linkUrl }${ column.linkKeys?.map (k => String( row[ k as keyof T ] ) ).join( '/' ) }` } className="text-blue-500 hover:underline">
                                            {String( row[ key ] ) }
                                        </a>
                                    ) : (
                                        String( row[ key ] )
                                    )
                                )}
                            </div>
                        ) }
                    </div>
                </TableCell>
            );
        } ) }
        </TableRow>
    );
}


// -------------------
// 공통화된 DndTable 컴포넌트
// -------------------
export function DndTable<T extends Record<string, unknown>>( { data, columns, idKey, title, onDragEnd, onUpdate, onAddRow, onRemoveRow }: IDndTableProps<T>) {
    const sensors = useSensors (
        useSensor( PointerSensor ),
        useSensor( KeyboardSensor )
    );

    // 드래그 & 드랍 핸들러
    function handleDragEnd( event: DragEndEvent ) {
        const { active, over } = event;
        
        // active.id는 String(row[idKey])와 동일
        if ( active.id !== over?.id ) {
            const oldIndex = data.findIndex( ( item ) => String( item[ idKey ] ) === active.id );
            const newIndex = data.findIndex( ( item ) => String( item[ idKey ] ) === over?.id );
            const newItems = arrayMove( data, oldIndex, newIndex );
            
            onDragEnd( newItems );
        }
    }

  return (
    <>
        <dt className="text-sm leading-6 font-semibold flex justify-between items-center">
            <span>{ title }</span>
            {onAddRow && (
                <div className="flex justify-start my-2">
                    <Button onClick={onAddRow} variant="ghost" className="text-gray-500" type="button">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        행 추가
                    </Button>
                </div>
            )}
        </dt>
        <dd className="text-sm leading-6 text-muted-foreground">
            <DndContext sensors={ sensors } collisionDetection={ closestCenter } onDragEnd={ handleDragEnd }>
                <SortableContext items={ data.map( item => String( item[ idKey ] ) ) } strategy={ verticalListSortingStrategy }>
                    <Table>
                        <TableHeader className="bg-muted">
                            <TableRow>
                                { columns.map( ( column ) => (
                                    <TableHead key={ String( column.key ) } className={ column.className }>{ column.label }</TableHead>
                                ) ) }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { data.map((row) => (
                                <SortableTableRow<T> key={ String( row[ idKey ] ) } row={ row } columns={ columns } onUpdate={ onUpdate } onRemoveRow={ onRemoveRow } idKey={ idKey } />
                            ) ) }
                        </TableBody>
                    </Table>
                </SortableContext>
            </DndContext>
        </dd>
    </>
  );
}