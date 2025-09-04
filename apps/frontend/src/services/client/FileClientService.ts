import { IAtchFileProps } from '@/types/components/FileType'

/**
 * BFF 기본 URL
 */
const BASE_BFF_SERVICE_URL = '/bff/attch-files'

/**
 * 첨부 파일 목록
 * @param query
 * @returns
 */
export async function fetchAtchFileViaBff({ atchFileId }: { atchFileId: number }) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}/${atchFileId}`)

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<IAtchFileProps[]>
}

/**
 * 첨부 파일 업로드
 * @param query
 * @returns
 */
export async function uploadAtchFileViaBff({ data }: { data: FormData }) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}`, {
        method: 'POST',
        body: data
    })

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<number>
}
