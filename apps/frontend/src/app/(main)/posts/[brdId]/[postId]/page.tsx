import React from "react"
import { getBoard } from '@/services/server/BoardServerService';
import { getPost } from '@/services/server/PostServerService';
import { View } from "@/app/posts/[brdId]/client";
import { formatDate } from '@/utils/DateUtils';
import { TiptapViewer } from '@/components/TipTaps';

/**
 * 메타 정보 생성
 * @param param
 * @returns 
 */
export async function generateMetadata( { params } : { params : { brdId : string, postId : string } } ) {
    const { brdId, postId } = await Promise.resolve( params );
    // API 호출
    const board = await getBoard( { brdId } );
    const post = await getPost({ brdId, postId });
  
    return {
        title: `${ board.brdNm } 상세 - now2woy\'s Portfolio`,
        description: `게시글 '${ post.postTtl }' 상세 조회하는 페이지 입니다.`,
    };
}

/**
 * 상세 컴포넌트
 * @param param
 * @returns 
 */
export default async function DetailViewer( { params }: { params : { brdId : string; postId : string } } ) {
    const { brdId, postId } = await Promise.resolve( params );

    // API 호출
    const board = await getBoard( { brdId } );
    const data = await getPost({ brdId, postId });
    
    return (
        <div className="flex flex-1 flex-col gap-2 p-4">
            <h1 className="text-2xl font-bold mb-4">{board.brdNm} 상세</h1>
            <div className="border border-gray-250 rounded-lg px-6">
                <dl className="grid grid-cols-1 sm:grid-cols-6 gap-x-4">

                    <div className="px-4 pb-2 pt-4 sm:col-span-3 sm:px-0">
                        <dt className="text-sm leading-6 font-semibold">제목</dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground mt-2">{ data.postTtl }</dd>
                    </div>

                    <div className="border-t px-4 pb-2 pt-4 sm:col-span-6 sm:px-0">
                    <dt className="text-sm leading-6 font-semibold">내용</dt>
                    <dd className="mt-1 text-sm leading-6 text-muted-foreground mt-2"><TiptapViewer content={ data.postCtt || '' } /></dd>
                    </div>

                    <div className="border-t px-4 pb-2 pt-4 sm:col-span-3 sm:px-0">
                    <dt className="text-sm leading-6 font-semibold">입력일시</dt>
                    <dd className="mt-1 text-sm leading-6 text-muted-foreground mt-2">{ formatDate( data.insDt ) }</dd>
                    </div>

                    <div className="border-t px-4 pb-2 pt-4 sm:col-span-3 sm:px-0">
                    <dt className="text-sm leading-6 font-semibold">수정일시</dt>
                    <dd className="mt-1 text-sm leading-6 text-muted-foreground mt-2">{ formatDate( data.updDt ) }</dd>
                    </div>
                </dl>
            </div>

            <View brdId={ brdId } postId={ postId } />
        </div>
    );
}