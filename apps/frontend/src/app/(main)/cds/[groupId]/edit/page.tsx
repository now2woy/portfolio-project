import React from "react"
import { getAuthenticationToken } from '@/utils/CookiesUtils';

import { fatchCdGroupOne, fatchCdList } from '@/service/CdService';

import { Edit } from "@/app/cds/client"; 

/**
 * 메타 정보 생성
 * @param param
 * @returns 
 */
export async function generateMetadata( { params } : { params : { groupId : string } } ) {
    const { groupId } = await Promise.resolve( params );
    const authentication = await getAuthenticationToken();
    // API 호출
    const cdGroup = await fatchCdGroupOne( { authentication, groupId } );
  
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
    const authentication = await getAuthenticationToken();

    // API 호출
    const cdGroup = await fatchCdGroupOne( { authentication, groupId } );
    const cds = await fatchCdList({ authentication, groupId });

    return (
        <form>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h1 className="text-2xl font-bold mb-4">{ `코드 그룹 ( ${ cdGroup.groupNm }) 수정` }</h1>
                <Edit authentication={ authentication } groupId={ groupId } data={{ ...cdGroup, cds: cds}} />
            </div>
        </form>
    );
}