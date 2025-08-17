import { createApi } from '@/lib/api';
import { IPageResponse } from "@/types/PageType";
import { IPostProps } from "@/types/PostType";
import { QueryFunctionContext } from "@tanstack/react-query";
import { authenticationProps } from '@/types/CommonType';

/**
 * API 기본 URL
 */
const BASE_SERVICE_URL = '/api/board/v1/posts';

/**
 * 쿼리 키 정의
 */
export const postKeys = {
    // 모든 게시글 관련 쿼리를 위한 최상위 키
    all: [ 'posts' ] as const,
    // 특정 게시판에 속한 게시글 목록 쿼리를 위한 키
    lists: ( authentication : authenticationProps, brdId: number, query?: string ) => [ ...postKeys.all, 'list', authentication, brdId, query ] as const,
};

/**
 * 게시글 목록 조회
 * @param context 
 * @returns 
 */
export const fetchListPost = async ( context: QueryFunctionContext<ReturnType<typeof postKeys.lists>> ): Promise<IPageResponse<IPostProps>> => {
  const [ _, __, authentication, brdId, query ] = context.queryKey;
  const api = createApi( authentication );
  const res = await api.get<IPageResponse<IPostProps>>( `${ BASE_SERVICE_URL }/${ brdId }?${ query }` );
  return res.data;
};

/**
 * 게시글 단건 조회
 * @param param
 * @returns 
 */
export const fatchOnePost = async ( { authentication, brdId, postId } : { authentication : authenticationProps, brdId : number, postId : number } ) => {
  const api = createApi( authentication );
  const res = await api.get<IPostProps>(`${BASE_SERVICE_URL}/${brdId}/${postId}`);
  return res.data;
}

/**
 * 게시글 입력
 * @param params
 * @returns 
 */
export const fetchInsPost = async ( { authentication, brdId, data } : { authentication: authenticationProps, brdId: number, data: IPostProps } ) => {
    const api = createApi( authentication );
    await api.post(`${BASE_SERVICE_URL}/${brdId}`, data);
};

/**
 * 게시글 수정
 * @param params
 * @returns 
 */
export const fetchUpdPost = async ( { authentication, brdId, postId, data } : { authentication: authenticationProps, brdId: number, postId: number, data : IPostProps } ) => {
    const api = createApi( authentication );
    await api.put(`${BASE_SERVICE_URL}/${brdId}/${postId}`, data);
};


/**
 * 게시글 삭제
 * @param params
 * @returns 
 */
export const fetchDelPost = async ( { authentication, brdId, postId } : { authentication: authenticationProps, brdId: number, postId: number } ) => {
    const api = createApi( authentication );
    await api.delete(`${BASE_SERVICE_URL}/${brdId}/${postId}`);
};
