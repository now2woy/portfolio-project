import { NextRequest, NextResponse } from 'next/server'
import { download } from '@/services/server/FileServerService'

/**
 * GET 방식 처리
 * @param req
 * @returns
 */
export async function GET(req: NextRequest, { params }: { params: { atchFileId: number; atchFileSeq: number } }) {
    const { atchFileId, atchFileSeq } = await Promise.resolve(params)
    try {
        const res = await download({ atchFileId, atchFileSeq })
        const data = await res.json()

        // 스트림 형태로 클라이언트에 응답 전달
        return NextResponse.json({ url: data.url })
    } catch (error) {
        return NextResponse.json({ ok: false, message: (error as Error).message }, { status: 401 })
    }
}
