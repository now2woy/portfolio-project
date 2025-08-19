'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, MinusCircle, PlusCircle } from 'lucide-react';

// 공통 컬럼 정의 타입
interface IDndColumnProps<T> {
  key: keyof T | string;
  label: string;
  className?: string;
  linkUrl?: string;
  linkKeys?: (keyof T)[];
  isDndColumn?: boolean;
  inputType?: 'text' | 'select' | 'checkbox';
}

function SortableTableRow<T>({ row, columns, onUpdate, idKey, onRemoveRow }: { 
  row: T; 
  columns: IDndColumnProps<T>[]; 
  onUpdate: (id: string, key: keyof T, value: any) => void;
  idKey: keyof T;
  onRemoveRow?: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: String(row[idKey]) });
  const [editingCell, setEditingCell] = useState<keyof T | null>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEditClick = (key: keyof T) => {
    const currentColumn = columns.find(col => col.key === key);
    if (editingCell === key && currentColumn?.inputType === 'select') return;
    setEditingCell(key);
  };
  
  // 삭제 버튼 핸들러
  const handleRemoveClick = () => {
    if (onRemoveRow) {
      onRemoveRow(String(row[idKey]));
    }
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      {columns.map((column) => {
        if (column.key === 'dndHandler') {
          return (
            <TableCell key={column.key} className={column.className}>
              <div {...attributes} {...listeners} className="cursor-grab p-2">
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
            </TableCell>
          );
        }
        
        const key = column.key as keyof T;

        return (
          <TableCell key={String(column.key)} className={column.className}>
            {editingCell === key && column.inputType ? (
              <div className="w-full">
                {column.inputType === 'text' && (
                  <Input
                    defaultValue={String(row[key])}
                    onBlur={(e) => onUpdate(String(row[idKey]), key, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onUpdate(String(row[idKey]), key, (e.target as HTMLInputElement).value);
                      }
                    }}
                    autoFocus
                  />
                )}
                {column.inputType === 'select' && (
                  <Select
                    defaultValue={String(row[key])}
                    onValueChange={(value) => onUpdate(String(row[idKey]), key, value)}
                    onOpenChange={(open) => {
                      if (!open) {
                        setEditingCell(null);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Y">Y</SelectItem>
                      <SelectItem value="N">N</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            ) : (
              <div
                onClick={() => column.inputType && handleEditClick(key)}
                className={`w-full py-2 px-4 ${column.inputType && 'cursor-pointer'}`}
              >
                {column.isDndColumn ? String(row[key]) : (
                  column.linkUrl ? (
                    <a href={`${column.linkUrl}${column.linkKeys?.map(k => String(row[k as keyof T])).join('/')}`} className="text-blue-500 hover:underline">
                      {String(row[key])}
                    </a>
                  ) : (
                    String(row[key])
                  )
                )}
              </div>
            )}
            {/* 삭제 버튼 추가: 마지막 컬럼에만 버튼을 추가하기 위해 조건부 렌더링 */}
            {onRemoveRow && columns[columns.length - 1].key === column.key && (
                <Button onClick={handleRemoveClick} variant="ghost" className="text-gray-500" type="button"><MinusCircle className="h-4 w-4" /></Button>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}


// -------------------
// 공통화된 DndTable 컴포넌트
// -------------------
export function DndTable<T extends Record<string, any>>({ 
  data, 
  columns, 
  onDragEnd,
  onUpdate,
    onAddRow,
  onRemoveRow,
  idKey
}: {
  data: T[];
  columns: IDndColumnProps<T>[];
  onDragEnd: (items: T[]) => void;
  onUpdate: (id: string, key: keyof T, value: any) => void;
  onAddRow?: () => void;
  onRemoveRow?: (id: string) => void;
  idKey: keyof T; // id 역할을 하는 키를 prop으로 받음
}) {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    // active.id는 String(row[idKey])와 동일
    if (active.id !== over?.id) {
      const oldIndex = data.findIndex((item) => String(item[idKey]) === active.id);
      const newIndex = data.findIndex((item) => String(item[idKey]) === over?.id);

      const newItems = arrayMove(data, oldIndex, newIndex);
      
      onDragEnd(newItems);
    }
  }

  return (
    <>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* items에 동적으로 idKey 값을 전달 */}
        <SortableContext items={data.map(item => String(item[idKey]))} strategy={verticalListSortingStrategy}>
            <Table>
            <TableHeader>
                <TableRow>
                {columns.map((column) => (
                    <TableHead key={String(column.key)} className={column.className}>{column.label}</TableHead>
                ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row) => (
                <SortableTableRow<T> key={String(row[idKey])} row={row} columns={columns} onUpdate={onUpdate} onRemoveRow={onRemoveRow} idKey={idKey} />
                ))}
            </TableBody>
            </Table>
        </SortableContext>
        </DndContext>
        {onAddRow && (
            <div className="flex justify-start my-4">
            <Button onClick={onAddRow} variant="ghost" className="text-gray-500" type="button">
                <PlusCircle className="h-4 w-4 mr-2" />
                행 추가
            </Button>
            </div>
        )}
    </>
  );
}