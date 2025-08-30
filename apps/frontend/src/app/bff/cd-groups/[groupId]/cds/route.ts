import { NextRequest, NextResponse } from 'next/server'
import { updateCdGroupAndCds } from '@/services/server/CdGroupServerService'

/**
 * PUT 방식 처리
 * @param req
 * @returns
 */
export async function PUT(
    req: NextRequest,
    { params }: { params: { groupId: string } }
) {
    const data = await req.json()
    const { groupId } = await Promise.resolve(params)

    try {
        const cds = await updateCdGroupAndCds({ groupId, data })
        return NextResponse.json(cds)
    } catch (error) {
        return NextResponse.json(
            { ok: false, message: (error as Error).message },
            { status: 401 }
        )
    }
}
