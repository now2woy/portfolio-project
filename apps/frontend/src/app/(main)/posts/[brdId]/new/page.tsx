import React from "react"
import { getAuthenticationToken } from '@/utils/CookiesUtils';
import { fatchOneBoard } from '@/service/BoardService';
import { Edit } from "@/app/posts/[brdId]/client"; 

/**
 * 메타 정보 생성
 * @param param
 * @returns 
 */
export async function generateMetadata( { params } : { params : { brdId : number } } ) {
    const { brdId } = await Promise.resolve( params );
    const authentication = await getAuthenticationToken();
    // API 호출
    const board = await fatchOneBoard( { authentication, brdId } );
  
    return {
        title: `${ board.brdNm } 신규 - now2woy\'s Portfolio`,
        description: `${ board.brdNm } 신규 게시글을 입력하는 화면입니다.`,
    };
}

/**
 * 게시글 입력 컴포넌트
 * @param param
 * @returns 
 */
export default async function PostNew( { params }: { params : { brdId : number; postId : number } } ) {
    const { brdId, postId } = await Promise.resolve( params );
    const authentication = await getAuthenticationToken();

    // API 호출
    const board = await fatchOneBoard( { authentication, brdId } );

    return (
        <form>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h1 className="text-2xl font-bold mb-4">{board.brdNm} 신규</h1>
                <Edit authentication={ authentication } brdId={ brdId } postId={ postId } />
            </div>
        </form>
    );
}