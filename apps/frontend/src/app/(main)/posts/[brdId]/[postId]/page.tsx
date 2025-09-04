import React from 'react'
import { getBoard } from '@/services/server/BoardServerService'
import { getPost } from '@/services/server/PostServerService'
import { fetchAtchFile } from '@/services/server/FileServerService'

import { View } from '@/app/posts/[brdId]/client'
import { formatDate } from '@/utils/DateUtils'
import { TiptapViewer } from '@/components/TipTaps'
import { FileViewer } from '@/components/Files/FileViewer'
import { StaticDetailViewer } from '@/components/Viewers/StaticDetailViewer'

import { IStaticFieldProps } from '@/types/components/ViewType'
import { IPostProps } from '@/types/apps/PostType'

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
        title: `${board.brdNm} 상세 - now2woy\'s Portfolio`,
        description: `게시글 '${post.postTtl}' 상세 조회하는 페이지 입니다.`
    }
}

/**
 * 상세 컴포넌트
 * @param param
 * @returns
 */
export default async function DetailViewer({ params }: { params: { brdId: string; postId: string } }) {
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

    // 필드 레이아웃 정의
    const fields: IStaticFieldProps<IPostProps>[] = [
        { key: 'postTtl', label: '제목', colSpan: 6 },
        { key: 'postCtt', label: '내용', colSpan: 6, hasBorderTop: true, render: value => <TiptapViewer content={(value as string) || ''} /> },
        { key: 'isAttachFiles', label: '첨부파일', colSpan: 6, hasBorderTop: true, render: value => (value ? <FileViewer files={data.files?.attchFiles} /> : <span>첨부된 파일이 없습니다.</span>) },
        { key: 'insDt', label: '입력일시', colSpan: 3, hasBorderTop: true, render: value => formatDate(value as string) },
        { key: 'updDt', label: '수정일시', colSpan: 3, hasBorderTop: true, render: value => formatDate(value as string) }
    ]

    return (
        <div className="flex flex-1 flex-col gap-2 p-4">
            <h1 className="mb-4 text-2xl font-bold">{board.brdNm} 상세</h1>
            <StaticDetailViewer<IPostProps>
                data={data}
                fields={fields}></StaticDetailViewer>
            <View
                brdId={brdId}
                postId={postId}
            />
        </div>
    )
}
