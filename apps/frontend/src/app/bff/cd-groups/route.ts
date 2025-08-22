import { NextRequest, NextResponse } from 'next/server';
import { fetchCdGroups, insertCdGroup } from '@/services/server/CdGroupServerService';

/**
 * GET 방식 처리
 * @param req 
 * @returns 
 */
export async function GET( req : NextRequest ) {
    const query = req.nextUrl.searchParams.toString();

    try {
        const cds = await fetchCdGroups( { query } );
        return NextResponse.json( cds );
    } catch ( error ) {
        return NextResponse.json( { ok: false, message: ( error as Error ).message }, { status: 401 } );
    }
}

/**
 * POST 방식 처리
 * @param req 
 * @returns 
 */
export async function POST( req : NextRequest ) {
    const data = await req.json();

    try {
        const cds = await insertCdGroup( {  data  });
        return NextResponse.json( cds );
    } catch ( error ) {
        return NextResponse.json( { ok: false, message: ( error as Error ).message }, { status: 401 } );
    }
}
