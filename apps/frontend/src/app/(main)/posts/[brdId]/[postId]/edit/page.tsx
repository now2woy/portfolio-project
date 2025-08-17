import React from "react"
import { getAuthenticationToken } from '@/utils/CookiesUtils';
import { fatchOneBoard } from '@/service/BoardService';
import { fatchOnePost } from '@/service/PostService';
import { Edit } from "@/app/posts/[brdId]/client"; 

/**
 * 메타 정보 생성
 * @param param
 * @returns 
 */
export async function generateMetadata( { params } : { params : { brdId : number, postId : number } } ) {
    const { brdId, postId } = await Promise.resolve( params );
    const authentication = await getAuthenticationToken();
    // API 호출
    const board = await fatchOneBoard( { authentication, brdId } );
    const post = await fatchOnePost({ authentication, brdId, postId });
  
    return {
        title: `${ board.brdNm } 수정 - now2woy\'s Portfolio`,
        description: `게시글 '${ post.postTtl }' 수정하는 페이지 입니다.`,
    };
}

/**
 * 게시글 수정 컴포넌트
 * @param param
 * @returns 
 */
export default async function PostEdit ( { params }: { params : { brdId : number; postId : number } } ) {
    const { brdId, postId } = await Promise.resolve( params );
    const authentication = await getAuthenticationToken();

    // API 호출
    const board = await fatchOneBoard( { authentication, brdId } );
    const data = await fatchOnePost({ authentication, brdId, postId });

    return (
        <form>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h1 className="text-2xl font-bold mb-4">{board.brdNm} 수정</h1>
                <Edit authentication={ authentication } brdId={ brdId } postId={ postId } data={ data } />
            </div>
        </form>
    );
}