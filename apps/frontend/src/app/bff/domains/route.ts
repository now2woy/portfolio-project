import { NextRequest, NextResponse } from 'next/server'
import { fetchDomains, insertDomain } from '@/services/server/DomainServerService'
import { IDomainProps } from '@/types/apps/DomainType'

/**
 * 도메인 목록 조회 (BFF)
 * @param request NextRequest
 * @returns NextResponse
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.toString()

    try {
        const data = await fetchDomains({ query })
        return NextResponse.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
}

/**
 * 도메인 입력 (BFF)
 * @param request NextRequest
 * @returns NextResponse
 */
export async function POST(request: NextRequest) {
    try {
        const data: IDomainProps = await request.json()
        const result = await insertDomain({ data })
        return NextResponse.json(result)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
}
