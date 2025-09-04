import { apiFetch, apiFetchResponse } from '@/app/lib/apiClient'
import { IAtchFileProps } from '@/types/components/FileType'

const BASE_API_SERVICE_URL = '/api/system/v1/attch-files'

/**
 * 첨부 파일 목록 조회
 * @param param
 * @returns
 */
export const fetchAtchFile = async ({
    atchFileId
}: {
    atchFileId?: number
}) => {
    try {
        return await apiFetch<IAtchFileProps[]>(
            `${BASE_API_SERVICE_URL}/${atchFileId}`
        )
    } catch (error) {
        throw error
    }
}

/**
 * 첨부파일 다운로드
 * @param param
 * @returns
 */
export const download = async ({
    atchFileId,
    atchFileSeq
}: {
    atchFileId: number
    atchFileSeq: number
}) => {
    try {
        return await apiFetchResponse(
            `${BASE_API_SERVICE_URL}/${atchFileId}/${atchFileSeq}`
        )
    } catch (error) {
        throw error
    }
}

/**
 * 첨부 파일 업로드
 * @param params
 * @returns
 */
export const uploadAtchFile = async ({ data }: { data: FormData }) => {
    try {
        return await apiFetch<number>(`${BASE_API_SERVICE_URL}`, {
            method: 'POST',
            body: data
        })
    } catch (error) {
        throw error
    }
}
