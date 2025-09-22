import { NextRequest, NextResponse } from 'next/server'
import { deleteTerm, getTerm, updateTerm } from '@/services/server/TermServerService'
import { ITermProps } from '@/types/apps/TermType'

/**
 * 용어 단건 조회 (BFF)
 * @param request NextRequest
 * @param params { params: { termId: string } }
 * @returns NextResponse
 */
export async function GET(request: NextRequest, { params }: { params: { termId: string } }) {
    const { termId } = params

    try {
        const data = await getTerm({ termId })
        return NextResponse.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
}

/**
 * 용어 수정 (BFF)
 * @param request NextRequest
 * @param params { params: { termId: string } }
 * @returns NextResponse
 */
export async function PUT(request: NextRequest, { params }: { params: { termId: string } }) {
    const { termId } = params

    try {
        const data: ITermProps = await request.json()
        const result = await updateTerm({ termId, data })
        return NextResponse.json(result)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
}

/**
 * 용어 삭제 (BFF)
 * @param request NextRequest
 * @param params { params: { termId: string } }
 * @returns NextResponse
 */
export async function DELETE(request: NextRequest, { params }: { params: { termId: string } }) {
    const { termId } = params

    try {
        const result = await deleteTerm({ termId })
        return NextResponse.json(result)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
}
