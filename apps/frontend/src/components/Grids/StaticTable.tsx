import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IStaticTableProps } from '@/types/components/GridType';

/**
 * 서버 컴포넌트에서 사용 가능한 정적 테이블
 * @param param
 * @returns 
 */
export function StaticTable<T extends Record<string, any>>({ data, columns }: IStaticTableProps<T>) {
    return (
        <div className="overflow-hidden border">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={String(column.key)} className={column.className}>
                                {column.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column) => (
                                <TableCell key={String(column.key)} className={column.className}>
                                    {column.linkUrl && column.linkKeys ? (
                                        <Button variant="link" className="text-muted-foreground w-fit px-0 text-left">
                                            <Link href={
                                                column.linkUrl + 
                                                column.linkKeys.map(key => `/${item[key]}`).join('')
                                            }>
                                                {item[column.key]}
                                            </Link>
                                        </Button>
                                    ) : (
                                        item[column.key]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}