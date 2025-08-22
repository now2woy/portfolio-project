import React from "react"

import { getCdGroup, fetchCds } from '@/services/server/CdGroupServerService';

import { Edit } from "@/app/cd-groups/client"; 

/**
 * 메타 정보 생성
 * @param param
 * @returns 
 */
export async function generateMetadata( { params } : { params : { groupId : string } } ) {
    const { groupId } = await Promise.resolve( params );
    // API 호출
    const cdGroup = await getCdGroup( { groupId } );
  
    return {
        title: `코드 그룹 '${ cdGroup.groupNm }' 수정 - now2woy\'s Portfolio`,
        description: `코드 그룹 (${ cdGroup.groupNm }) 수정 조회하는 페이지 입니다.`,
    };
}

/**
 * 수정 컴포넌트
 * @param param
 * @returns 
 */
export default async function EditViewer ( { params }: { params : { groupId : string } } ) {
    const { groupId } = await Promise.resolve( params );

    // API 호출
    const cdGroup = await getCdGroup( { groupId } );
    const cds = await fetchCds({ groupId });

    return (
        <form>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h1 className="text-2xl font-bold mb-4">{ `코드 그룹 ( ${ cdGroup.groupNm }) 수정` }</h1>
                <Edit groupId={ groupId } data={{ ...cdGroup, cds: cds}} />
            </div>
        </form>
    );
}