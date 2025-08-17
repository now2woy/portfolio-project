'use client';

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import { IPageResponse } from "@/types/PageType";
import { useRouter, useSearchParams } from 'next/navigation';

// 페이지 번호 그룹을 계산하는 함수 (기존과 동일)
const getPaginationGroup = ( currentPage : number, totalPages : number ) => {
    const group = [];
    // ... (로직은 이전 답변과 동일) ...
    const minPage = 1;
    const maxPage = totalPages;

    let startPage = Math.max(minPage, currentPage - 1);
    let endPage = Math.min(maxPage, currentPage + 1);

    if (currentPage === minPage) {
        endPage = Math.min(maxPage, startPage + 2);
    } else if (currentPage === maxPage) {
        startPage = Math.max(minPage, endPage - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
        group.push(i);
    }

    return group;
};

export const GridPagination = <T,>({ data }: { data: IPageResponse<T> }) => {
    // URLSearchParams를 Next.js의 useSearchParams 훅으로 가져옵니다.
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const totalPages = data.totalPages || 1;
    // data.number는 0부터 시작하는 인덱스입니다.
    const thisPage = data.number + 1;
    
    // 페이지 번호 그룹을 계산합니다.
    const pagesToShow = getPaginationGroup(thisPage, totalPages);
    
    // 이 함수가 1-based 페이지 번호를 받아 0-based 쿼리를 만듭니다.
    const handlePaginationClick = ( page : number ) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', (page).toString());
        router.push(`?${params.toString()}`);
    };

    const showPrevious = thisPage > 1;
    const showNext = thisPage < totalPages;
    const showEllipsisStart = !pagesToShow.includes(1) && totalPages > 3;
    const showEllipsisEnd = !pagesToShow.includes(totalPages) && totalPages > 3;

    return (
        <Pagination>
            <PaginationContent>
                {showPrevious && (
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePaginationClick(thisPage - 2)} />
                    </PaginationItem>
                )}

                {showEllipsisStart && (
                    <>
                        <PaginationItem><PaginationLink onClick={() => handlePaginationClick(1)} >1</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationEllipsis /></PaginationItem>
                    </>
                )}

                {pagesToShow.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink onClick={() => handlePaginationClick(page - 1)} isActive={page === thisPage} className="cursor-pointer">
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {showEllipsisEnd && (
                    <>
                        <PaginationItem><PaginationEllipsis /></PaginationItem>
                        <PaginationItem><PaginationLink onClick={() => handlePaginationClick(totalPages)} >{totalPages}</PaginationLink></PaginationItem>
                    </>
                )}

                {showNext && (
                    <PaginationItem>
                        <PaginationNext onClick={() => handlePaginationClick(thisPage)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};