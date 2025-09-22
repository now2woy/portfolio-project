import { NextRequest, NextResponse } from 'next/server'
import { fetchTerms, insertTerm } from '@/services/server/TermServerService'
import { ITermProps } from '@/types/apps/TermType'

/**
 * 용어 목록 조회 (BFF)
 * @param request NextRequest
 * @returns NextResponse
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.toString()

    try {
        const data = await fetchTerms({ query })
        return NextResponse.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
}

/**
 * 용어 입력 (BFF)
 * @param request NextRequest
 * @returns NextResponse
 */
export async function POST(request: NextRequest) {
    try {
        const data: ITermProps = await request.json()
        const result = await insertTerm({ data })
        return NextResponse.json(result)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
}
