import React from 'react'
import { getBoard } from '@/services/server/BoardServerService'
import { getPost } from '@/services/server/PostServerService'
import { fetchAtchFile } from '@/services/server/FileServerService'
import { Edit } from '@/app/posts/[brdId]/client'

/**
 * 메타 정보 생성
 * @param param
 * @returns
 */
export async function generateMetadata({ params }: { params: { brdId: string; postId: string } }) {
    const { brdId, postId } = await Promise.resolve(params)

    // API 호출
    const board = await getBoard({ brdId })
    const post = await getPost({ brdId, postId })

    return {
        title: `${board.brdNm} 수정 - now2woy\'s Portfolio`,
        description: `게시글 '${post.postTtl}' 수정하는 페이지 입니다.`
    }
}

/**
 * 수정 컴포넌트
 * @param param
 * @returns
 */
export default async function EditViewer({ params }: { params: { brdId: string; postId: string } }) {
    const { brdId, postId } = await Promise.resolve(params)

    // API 호출
    const board = await getBoard({ brdId })
    const data = await getPost({ brdId, postId })
    if (data.atchFileId) {
        data.files = {
            atchFileId: data.atchFileId,
            attchFiles: await fetchAtchFile({ atchFileId: data.atchFileId })
        }
    }
    data.isAttachFiles = data.files?.attchFiles && data.files.attchFiles.length > 0 ? true : false

    return (
        <div className="flex flex-1 flex-col gap-2 p-4">
            <h1 className="mb-4 text-2xl font-bold">{board.brdNm} 수정</h1>
            <Edit
                brdId={brdId}
                postId={postId}
                data={data}
                board={board}
            />
        </div>
    )
}
