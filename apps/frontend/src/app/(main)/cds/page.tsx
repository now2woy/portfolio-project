import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAuthenticationToken } from '@/utils/CookiesUtils';

import { postKeys, fetchCdGroupList } from '@/service/CdService';
import { ISearchData, ISearchField } from "@/types/SearchType";
import { ICdListProps } from '@/types/CdType';
import { List } from "@/app/cds/client";

/**
 * 게시글 검색 조건 입력 방식 정의
 */
const fields : ISearchField[] = [
    { label : '코드그룹ID', value : 'groupId', type : 'text' as const },
    { label : '코드그룹명', value : 'groupNm', type : 'text' as const },
    { label : '사용여부', value : 'useYn', type : 'text' as const },
];

/**
 * 정적 메타 정의
 */
export const metadata : Metadata = {
  title : "코드 목록 - now2woy's Portfolio",
  description : "코드 목록을 조회하는 페이지입니다.",
};

/**
 * 코드 목록 서버 컴포넌트
 * @param param
 * @returns 
 */
export default async function ListViewer( { searchParams } : ICdListProps ) {
    const queryClient = new QueryClient();
    const { groupId, groupNm, useYn } = await Promise.resolve( searchParams );
    const authentication = await getAuthenticationToken();
    
    // 검색 조건을 query 파라미터로 생성
    const query : string = new URLSearchParams( {
        groupId : groupId ?? '',
        groupNm : groupNm ?? '',
        useYn : useYn ?? '',
    } ).toString();

    // 검색 조건 초기 데이터 생성
    const initialData: ISearchData = {
        groupId : groupId ?? '',
        groupNm : groupNm ?? '',
        useYn : useYn ?? '',
    };

    // prefetch
    await queryClient.prefetchQuery( {
        queryKey: postKeys.lists( authentication, query )
        , queryFn: fetchCdGroupList
    } );

    return (
        <HydrationBoundary state={ dehydrate( queryClient ) }>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h1 className="text-2xl font-bold mb-4">코드 목록</h1>
                <List authentication={ authentication } initialData={ initialData } fields={ fields } />
            </div>
        </HydrationBoundary>
    );
}