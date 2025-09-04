import { NextRequest, NextResponse } from 'next/server'
import { fetchPosts, insertPost } from '@/services/server/PostServerService'

/**
 * GET 방식 처리
 * @param req
 * @returns
 */
export async function GET(
    req: NextRequest,
    { params }: { params: { brdId: string } }
) {
    const { brdId } = await Promise.resolve(params)
    const query = req.nextUrl.searchParams.toString()

    try {
        const data = await fetchPosts({ brdId, query })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { ok: false, message: (error as Error).message },
            { status: 401 }
        )
    }
}

/**
 * POST 방식 처리
 * @param req
 * @returns
 */
export async function POST(
    req: NextRequest,
    { params }: { params: { brdId: string } }
) {
    const data = await req.json()
    const { brdId } = await Promise.resolve(params)

    try {
        const result = await insertPost({ brdId, data })
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(
            { ok: false, message: (error as Error).message },
            { status: 401 }
        )
    }
}
