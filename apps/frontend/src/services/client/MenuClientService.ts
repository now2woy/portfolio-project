import { IMainMenuProps } from '@/types/components/MenuType'

/**
 * BFF 기본 URL
 */
const BASE_BFF_SERVICE_URL = '/bff/menus'

/**
 * 모든 메뉴 BFF 수정
 * @param query
 * @returns
 */
export async function updateAllMenusViaBff({
    data
}: {
    data: IMainMenuProps[]
}) {
    const res = await fetch(`${BASE_BFF_SERVICE_URL}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })

    // 성공인지 확인
    if (!res.ok) {
        // 오류 응답 본문 파싱
        const errorBody = await res.json()

        // 에러 throw
        throw new Error(errorBody.message)
    }

    // 성공적인 응답은 JSON으로 변환하여 반환
    return res.json() as Promise<IMainMenuProps[]>
}
