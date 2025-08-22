import { apiFetch } from '@/app/lib/apiClient';
import { IPageResponse } from "@/types/PageType";
import { ICdGroupProps, ICdProps } from "@/types/apps/CdGroupType";

/**
 * API 기본 URL
 */
const BASE_API_SERVICE_URL = '/api/system/v1/cd-groups';
/**
 * API 기본 URL
 */
const CD_API_SERVICE_URL = '/api/system/v1/cds';

/**
 * 코드 관리 API 목록 조회
 * @param query
 * @returns 
 */
export async function fetchCdGroups( { query } : { query?: string } ) {
    return apiFetch<IPageResponse<ICdGroupProps>>( `${ BASE_API_SERVICE_URL }?${ query }` );
}


/**
 * 코드 목록 조회
 * @param param
 * @returns 
 */
export const fetchCds = async ( { groupId } : { groupId : string } ) => {
    try {
        return await apiFetch<ICdProps[]>( `${ CD_API_SERVICE_URL }/${ groupId }` );
    } catch(error) {
        throw error;
    }
}

/**
 * 코드 그룹 단건 조회
 * @param param
 * @returns 
 */
export const getCdGroup = async ( { groupId } : { groupId : string } ) => {
    try {
        return await apiFetch<ICdGroupProps>( `${ BASE_API_SERVICE_URL }/${ groupId }` );
    } catch(error) {
        throw error;
    }
}

/**
 * 코드 그룹 입력
 * @param params
 * @returns 
 */
export const insertCdGroup = async ( { data } : { data: ICdGroupProps } ) => {
    try {
        return await apiFetch<ICdGroupProps>( `${ BASE_API_SERVICE_URL }`, {
            method : 'POST',
            body : data
        } );
    } catch(error) {
        throw error;
    }
};

/**
 * 코드 그룹 수정
 * @param params
 * @returns 
 */
export const updateCdGroup = async ( { groupId, data } : { groupId: string, data : ICdGroupProps } ) => {
    try {
        return await apiFetch<ICdGroupProps>( `${ BASE_API_SERVICE_URL }/${ groupId }`, {
            method : 'PUT',
            body : data
        } );
    } catch(error) {
        throw error;
    }
};

/**
 * 코드 그룹 및 하위 코드 수정
 * @param params
 * @returns 
 */
export const updateCdGroupAndCds = async ( { groupId, data } : { groupId: string, data : ICdGroupProps } ) => {
    try {
        return await apiFetch<ICdGroupProps>( `${ BASE_API_SERVICE_URL }/${ groupId }/cds`, {
            method : 'PUT',
            body : data
        } );
    } catch(error) {
        throw error;
    }
};

/**
 * 코드 그룹 및 하위 코드 삭제
 * @param params
 * @returns 
 */
export const deleteCdGroupAndCds = async ( { groupId } : { groupId: string } ) => {
    return await apiFetch<ICdGroupProps>( `${ BASE_API_SERVICE_URL }/${ groupId }`, {
        method : 'DELETE'
    } );
};