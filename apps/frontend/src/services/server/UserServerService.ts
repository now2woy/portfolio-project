import { apiFetch } from '@/app/lib/apiClient';
import { IUserChartProps } from '@/types/apps/UserType';

/**
 * API 기본 URL
 */
const BASE_API_SERVICE_URL = '/api/system/v1/users';

/**
 * 사용자 차트 API 목록 조회
 * @param query
 * @returns 
 */
export async function fetchTokenIssuedCounts() {
    return apiFetch<IUserChartProps[]>( `${ BASE_API_SERVICE_URL }/token-issued-counts` );
}