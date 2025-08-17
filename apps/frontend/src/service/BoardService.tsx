import { createApi } from '@/lib/api';
import { IBoardProps } from "@/types/BoardType";
import { authenticationProps } from '@/types/CommonType';

// Service 기본 URL
const BASE_SERVICE_URL = '/api/board/v1/boards';

/**
 * 게시판 단건 조회
 * @param param
 * @returns 
 */
export const fatchOneBoard = async ( { authentication, brdId } : { authentication : authenticationProps, brdId : number } ) => {
  const api = createApi( authentication );
  const res = await api.get<IBoardProps>(`${ BASE_SERVICE_URL }/${ brdId }`);
  return res.data;
}