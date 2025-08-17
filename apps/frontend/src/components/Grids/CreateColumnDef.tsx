import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { IColumnConfig } from "@/types/ColumnDefType";
import { formatDate } from '@/utils/DateUtils';
import { useSearchParams } from 'next/navigation';

export const CreateColumns = <T,>( config: IColumnConfig[] ): ColumnDef<T>[] => {
    const searchParams = useSearchParams();
     const query = new URLSearchParams(searchParams);

    // 컬럼 정의 생성
    return config.map((columnConfig) => {
        switch (columnConfig.type) {
        // 체크박스 타입 처리
        case 'checkbox':
            return {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    />
                ),
                enableHiding: false,
                size : columnConfig.size,
            };

        // 텍스트 타입 처리
        case 'text':
            // 필수값 체크
            if (!columnConfig.key) {
                throw new Error("Text type requires a 'key'");
            }

            return {
                accessorKey: columnConfig.key
                , header: () => <div className={columnConfig.align ? `text-${ columnConfig.align }` : ''}>{columnConfig.label}</div>
                , cell: ({ row }) => (
                    <div className={columnConfig.align ? `text-${ columnConfig.align }` : ''}>{row.getValue(columnConfig.key!)}</div>
                ),
                size : columnConfig.size,
            };

        // 링크 타입 처리
        case 'link':
            // 필수값 체크
            if (!columnConfig.key || !columnConfig.linkBaseUrl || !columnConfig.linkKeys) {
                throw new Error("Link type requires 'key', 'linkBaseUrl', and 'linkKeys'");
            }

            return {
                accessorKey: columnConfig.key
                , header: columnConfig.label
                , cell: ({ row }) => {
                    const linkUrl = columnConfig.linkKeys?.map(k => (row.original as Record<string, string>)[k]).join('/');
                    const finalUrl = `${columnConfig.linkBaseUrl}/${linkUrl}${query ? '?' + query : ''}`;
                    
                    return (
                    <div>
                        <Button variant="link" className="text-foreground w-fit px-0 text-left">
                            <Link href={finalUrl}>{row.getValue(columnConfig.key!)}</Link>
                        </Button>
                    </div>
                    );
                },
                size : columnConfig.size,
            };

        // 불린 타입 처리
        case 'boolean':
            if (!columnConfig.key) {
                throw new Error("Boolean type requires a 'key'");
            }
            return {
                accessorKey: columnConfig.key
                , header: columnConfig.label
                , cell: ({ row }) => (
                    <div>{row.getValue(columnConfig.key!) === 'Y' ? '예' : '아니오'}</div>
                ),
                size : columnConfig.size,
            };

        // 날짜 타입 처리
        case 'date':
            if (!columnConfig.key) {
                throw new Error("Date type requires a 'key'");
            }
            return {
                accessorKey: columnConfig.key
                , header: columnConfig.label
                , cell: ({ row }) => {
                    return <div>{ formatDate( row.getValue(columnConfig.key!) ) }</div>;
                },
                size : columnConfig.size,
            };

        // TODO 수정이 아닌 기능은 수정 해야 함 / 액션 타입 처리
        case 'actions':
            if (!columnConfig.linkBaseUrl || !columnConfig.linkKeys || !columnConfig.menu) {
                throw new Error("Actions type requires 'linkBaseUrl', 'linkKeys', and 'menu'");
            }
            return {
                id: "actions"
                , header: columnConfig.label
                , enableHiding: false
                , cell: ({ row }) => {
                    return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                            <span className="sr-only">메뉴 열기</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        {columnConfig.menu!.map((item) => {
                            if (item === '수정') {
                                const linkUrl = columnConfig.linkKeys?.map(k => (row.original as Record<string, string>)[k]).join('/');
                                const finalUrl = `${columnConfig.linkBaseUrl}/${linkUrl}${columnConfig.linkAddUrl ? columnConfig.linkAddUrl : ''}${query ? '?' + query : ''}`;
                                return (
                                    <DropdownMenuItem key={item} asChild>
                                        <Link href={ finalUrl } className="cursor-pointer">수정</Link>
                                    </DropdownMenuItem>
                                );
                            } else {
                                return (
                                    <DropdownMenuItem key={item}>
                                        {item}
                                    </DropdownMenuItem>
                                );
                            }
                        })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    );
                },
                size : columnConfig.size,
            };

        default:
            // 지원하지 않는 타입에 대한 기본 처리
            return {
            id: 'unhandled-column',
            header: 'Unhandled',
            cell: () => <div>-</div>,
            };
        }
    });
};