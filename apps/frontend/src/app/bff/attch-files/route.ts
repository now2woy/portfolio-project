import { NextRequest, NextResponse } from 'next/server'
import { uploadAtchFile } from '@/services/server/FileServerService'

/**
 * POST 방식 처리
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
    const data = await req.formData()

    try {
        const atchFileId = await uploadAtchFile({ data })
        return NextResponse.json(atchFileId)
    } catch (error) {
        return NextResponse.json(
            { ok: false, message: (error as Error).message },
            { status: 401 }
        )
    }
}
