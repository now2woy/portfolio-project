import { QueryFunctionContext } from "@tanstack/react-query";

import { fetchCdGroupsViaBff } from '@/services/client/CdGroupClientService';
import { IPageResponse } from "@/types/PageType";
import { ICdGroupProps } from "@/types/apps/CdGroupType";

/**
 * 쿼리 키 정의
 */
export const postKeys = {
    // 최상위 키
    all: [ 'cd-groups' ] as const,
    // 목록 쿼리를 위한 키
    lists: ( query?: string ) => [ ...postKeys.all, 'list', query ] as const,
};

/**
 * 코드 그룹 목록 조회
 * @param context 
 * @returns 
 */
export const fetchCdGroups = async ( context: QueryFunctionContext<ReturnType<typeof postKeys.lists>> ): Promise<IPageResponse<ICdGroupProps>> => {
    const [ _, __, query ] = context.queryKey;
    const res = await fetchCdGroupsViaBff( query );

    return res;
};