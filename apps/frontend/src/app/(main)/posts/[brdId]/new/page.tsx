import React from 'react'
import { getBoard } from '@/services/server/BoardServerService'
import { Edit } from '@/app/posts/[brdId]/client'

/**
 * 메타 정보 생성
 * @param param
 * @returns
 */
export async function generateMetadata({
    params
}: {
    params: { brdId: string }
}) {
    const { brdId } = await Promise.resolve(params)

    // API 호출
    const board = await getBoard({ brdId })

    return {
        title: `${board.brdNm} 신규 - now2woy\'s Portfolio`,
        description: `${board.brdNm} 신규 게시글을 입력하는 화면입니다.`
    }
}

/**
 * 신규 입력 컴포넌트
 * @param param
 * @returns
 */
export default async function NewViewer({
    params
}: {
    params: { brdId: string }
}) {
    const { brdId } = await Promise.resolve(params)

    // API 호출
    const board = await getBoard({ brdId })

    return (
        <form>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h1 className="mb-4 text-2xl font-bold">{board.brdNm} 신규</h1>
                <Edit
                    brdId={brdId}
                    postId=""
                />
            </div>
        </form>
    )
}
