import { NextRequest, NextResponse } from 'next/server'
import { updateAllMenus } from '@/services/server/MenuServerService'

/**
 * PUT 방식 처리
 * @param req
 * @returns
 */
export async function PUT(req: NextRequest) {
    const data = await req.json()

    try {
        const result = await updateAllMenus({ data })
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(
            { ok: false, message: (error as Error).message },
            { status: 401 }
        )
    }
}
