import { NextRequest, NextResponse } from 'next/server'
import { deleteDomain, getDomain, updateDomain } from '@/services/server/DomainServerService'
import { IDomainProps } from '@/types/apps/DomainType'

/**
 * 도메인 단건 조회 (BFF)
 * @param request NextRequest
 * @param params { params: { domainId: string } }
 * @returns NextResponse
 */
export async function GET(request: NextRequest, { params }: { params: { domainId: string } }) {
    const { domainId } = params

    try {
        const data = await getDomain({ domainId })
        return NextResponse.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
}

/**
 * 도메인 수정 (BFF)
 * @param request NextRequest
 * @param params { params: { domainId: string } }
 * @returns NextResponse
 */
export async function PUT(request: NextRequest, { params }: { params: { domainId: string } }) {
    const { domainId } = params

    try {
        const data: IDomainProps = await request.json()
        const result = await updateDomain({ domainId, data })
        return NextResponse.json(result)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
}

/**
 * 도메인 삭제 (BFF)
 * @param request NextRequest
 * @param params { params: { domainId: string } }
 * @returns NextResponse
 */
export async function DELETE(request: NextRequest, { params }: { params: { domainId: string } }) {
    const { domainId } = params

    try {
        const result = await deleteDomain({ domainId })
        return NextResponse.json(result)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
}
