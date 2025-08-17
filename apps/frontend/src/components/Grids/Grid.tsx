'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from "@tanstack/react-table"
import { IPageResponse } from "@/types/PageType";
import { IColumnConfig } from "@/types/ColumnDefType";
import { CreateColumns } from "./CreateColumnDef";
import { GridPagination } from "./Pagination";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * List의 데이터 영역
 * @param param
 * @returns 
 */
export function Grid<T>({ data, columnsConfig, newUrl }: { data : IPageResponse<T>, columnsConfig : IColumnConfig[], newUrl? : string }) {
    // 컬럼 정의 정보 생성
    const columns: ColumnDef<T>[] = CreateColumns( columnsConfig );
    const searchParams = useSearchParams();
    const router = useRouter();

    const table = useReactTable( {
        data : data.content,
        columns,
        getCoreRowModel : getCoreRowModel(),
        columnResizeMode: 'onChange',
        state: {},
    } );

    // 페이지 사이즈 변경 핸들러 함수
    const handlePageSizeChange = ( newPageSize : string ) => {
        // 현재 쿼리 파라미터를 가져와 URLSearchParams 객체로 만듭니다.
        const params = new URLSearchParams(searchParams);
        
        // 'size' 파라미터의 값을 새로운 페이지 사이즈로 업데이트합니다.
        params.set('size', newPageSize);
        
        // 'page' 파라미터는 보통 페이지 사이즈 변경 시 초기화합니다.
        // 첫 페이지로 돌아가는 것이 일반적인 사용자 경험입니다.
        params.set('page', '0'); 
        
        // 업데이트된 URL로 이동합니다.
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    전체 { table.getFilteredRowModel().rows.length }건
                </div>

                <div className="space-x-2">
                    <Select defaultValue="10" onValueChange={ handlePageSizeChange }>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="목록 건수" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className="bg-muted">  
                        { table.getHeaderGroups().map(( headerGroup ) => (
                        <TableRow key={ headerGroup.id }>
                            { headerGroup.headers.map( ( header ) => {
                                return (
                                    <TableHead key={ header.id } colSpan={ header.colSpan } style={ { minWidth: header.getSize() } }>
                                    { header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }
                                    </TableHead>
                                )
                            } ) }
                        </TableRow>
                        ) ) }
                    </TableHeader>

                    <TableBody>
                        { table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map( ( row ) => (
                            <TableRow key={ row.id } data-state={ row.getIsSelected() && "selected" } >
                                { row.getVisibleCells().map( ( cell ) => (
                                    <TableCell key={ cell.id }>
                                        { flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        ) }
                                    </TableCell>
                                ) ) }
                            </TableRow>
                        ) ) ) : (
                        <TableRow>
                            <TableCell colSpan={ columns.length } className="h-24 text-center" >
                                No results.
                            </TableCell>
                        </TableRow>
                        ) }
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-center space-x-2 py-4">
                <div className="space-x-2">
                    <GridPagination data={ data } />
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
                <div className="space-x-2">
                    { newUrl && <Link href={ newUrl }><Button className="text-white cursor-pointer">신규</Button></Link> }
                </div>
            </div>
        </div>
    )
}