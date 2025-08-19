import { createApi } from '@/lib/api';
import { IPageResponse } from "@/types/PageType";
import { ICdGroupProps, ICdProps } from "@/types/CdType";
import { QueryFunctionContext } from "@tanstack/react-query";
import { authenticationProps } from '@/types/CommonType';

/**
 * CD GROUP API 기본 URL
 */
const BASE_SERVICE_URL = '/api/system/v1/cd-groups';
/**
 * CD  API 기본 URL
 */
const BASE_CD_SERVICE_URL = '/api/system/v1/cds';

/**
 * 쿼리 키 정의
 */
export const postKeys = {
    // 모든 게시글 관련 쿼리를 위한 최상위 키
    all: [ 'cds' ] as const,
    // 특정 게시판에 속한 게시글 목록 쿼리를 위한 키
    lists: ( authentication : authenticationProps, query?: string ) => [ ...postKeys.all, 'list', authentication, query ] as const,
};

/**
 * 코드 그룹 목록 조회
 * @param context 
 * @returns 
 */
export const fetchCdGroupList = async ( context: QueryFunctionContext<ReturnType<typeof postKeys.lists>> ): Promise<IPageResponse<ICdGroupProps>> => {
  const [ _, __, authentication, query ] = context.queryKey;
  const api = createApi( authentication );
  const res = await api.get<IPageResponse<ICdGroupProps>>( `${ BASE_SERVICE_URL }?${ query }` );
  return res.data;
};

/**
 * 코드 목록 조회
 * @param param
 * @returns 
 */
export const fatchCdList = async ( { authentication, groupId } : { authentication : authenticationProps, groupId : string } ) : Promise<ICdProps[]> => {
  const api = createApi( authentication );
  const res = await api.get<ICdProps[]>(`${BASE_CD_SERVICE_URL}/${groupId}`);
  return res.data;
}

/**
 * 코드 그룹 단건 조회
 * @param param
 * @returns 
 */
export const fatchCdGroupOne = async ( { authentication, groupId } : { authentication : authenticationProps, groupId : string } ) => {
  const api = createApi( authentication );
  const res = await api.get<ICdGroupProps>(`${BASE_SERVICE_URL}/${groupId}`);
  return res.data;
}

/**
 * 코드 그룹 입력
 * @param params
 * @returns 
 */
export const fetchCdGroupIns = async ( { authentication, data } : { authentication: authenticationProps, data: ICdGroupProps } ) => {
    const api = createApi( authentication );
    await api.post(`${BASE_SERVICE_URL}`, data);
};

/**
 * 코드 그룹 수정
 * @param params
 * @returns 
 */
export const fetchCdGroupUpd = async ( { authentication, groupId, data } : { authentication: authenticationProps, groupId: string, data : ICdGroupProps } ) => {
    const api = createApi( authentication );
    await api.put(`${BASE_SERVICE_URL}/${groupId}`, data);
};

/**
 * 코드 그룹 및 하위 코드 수정
 * @param params
 * @returns 
 */
export const fetchCdGroupAndCdsUpd = async ( { authentication, groupId, data } : { authentication: authenticationProps, groupId: string, data : ICdGroupProps } ) => {
    const api = createApi( authentication );
    await api.put(`${BASE_SERVICE_URL}/${groupId}/cds`, data);
};


/**
 * 코드 그룹 및 하위 코드 삭제
 * @param params
 * @returns 
 */
export const fetchCdGroupAndCdsDel = async ( { authentication, groupId } : { authentication: authenticationProps, groupId: string } ) => {
    const api = createApi( authentication );
    await api.delete(`${BASE_SERVICE_URL}/${groupId}`);
};