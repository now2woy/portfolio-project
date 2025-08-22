import { apiFetch } from '@/app/lib/apiClient';
import { IBoardProps } from "@/types/BoardType";

const BASE_API_SERVICE_URL = '/api/board/v1/boards';

/**
 * 게시판 단건 조회
 * @param param
 * @returns 
 */
export const getBoard = async ( { brdId } : { brdId : string } ) => {
    try {
        return await apiFetch<IBoardProps>( `${ BASE_API_SERVICE_URL }/${ brdId }` );
    } catch(error) {
        throw error;
    }
}