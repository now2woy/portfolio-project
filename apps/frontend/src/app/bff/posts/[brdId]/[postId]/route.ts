import { NextRequest, NextResponse } from 'next/server';
import { insertPost, updatePost, deletePost } from '@/services/server/PostServerService';

/**
 * POST 방식 처리
 * @param req 
 * @returns 
 */
export async function POST( req : NextRequest, { params } : { params : { brdId : string } }  ) {
    const data = await req.json();
    const { brdId } = await Promise.resolve( params );

    try {
        const result = await insertPost( { brdId, data } );
        return NextResponse.json( result );
    } catch ( error ) {
        return NextResponse.json( { ok: false, message: ( error as Error ).message }, { status: 401 } );
    }
}

/**
 * PUT 방식 처리
 * @param req 
 * @returns 
 */
export async function PUT( req : NextRequest, { params } : { params : { brdId : string, postId : string } }  ) {
    const data = await req.json();
    const { brdId, postId } = await Promise.resolve( params );

    try {
        const result = await updatePost( { brdId, postId, data } );
        return NextResponse.json( result );
    } catch ( error ) {
        return NextResponse.json( { ok: false, message: ( error as Error ).message }, { status: 401 } );
    }
}

/**
 * DELETE 방식 처리
 * @param req 
 * @returns 
 */
export async function DELETE( req : NextRequest, { params } : { params : { brdId : string, postId : string } }  ) {
    const { brdId, postId } = await Promise.resolve( params );

    try {
        const result = await deletePost( { brdId, postId } );
        return NextResponse.json( result );
    } catch ( error ) {
        return NextResponse.json( { ok: false, message: ( error as Error ).message }, { status: 401 } );
    }
}