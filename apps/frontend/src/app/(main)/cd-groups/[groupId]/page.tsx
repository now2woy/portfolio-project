import React from "react"

import { getCdGroup, fetchCds } from '@/services/server/CdGroupServerService';
import { View } from "@/app/cd-groups/client";
import { formatDate } from '@/utils/DateUtils';
import { TiptapViewer } from '@/components/TipTaps';
import { StaticDetailViewer } from '@/components/Viewers/StaticDetailViewer';
import { StaticTable } from '@/components/Grids/StaticTable';
import { IStaticColumnProps } from '@/types/components/GridType';
import { ICdGroupProps, ICdProps } from "@/types/apps/CdGroupType";
import { IStaticFieldProps } from '@/types/components/ViewType';

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
        title: `코드 그룹 (${ cdGroup.groupNm }) 상세 - now2woy\'s Portfolio`,
        description: `코드 그룹 (${ cdGroup.groupNm }) 상세 조회하는 페이지 입니다.`,
    };
}

/**
 * 상세 컴포넌트
 * @param param
 * @returns 
 */
export default async function DetailViewer( { params }: { params : { groupId : string } } ) {
    const { groupId } = await Promise.resolve( params );

    // API 호출
    const cdGroup = await getCdGroup( { groupId } );
    const cds = await fetchCds({ groupId });
    
    // 필드 레이아웃 정의
    const fields: IStaticFieldProps<ICdGroupProps>[] = [
        { key: 'groupId', label: '코드그룹ID', colSpan: 3 },
        { key: 'groupNm', label: '코드그룹명', colSpan: 3 },
        { key: 'dataTyCd', label: '데이터타입', colSpan: 3 },
        { key: 'lt', label: '최대길이', colSpan: 3 },
        { key: 'dc', label: '설명', colSpan: 6, hasBorderTop: true, render: (value) => <TiptapViewer content={value as string || ''} /> },
        { key: 'useYn', label: '사용여부', colSpan: 3 },
        { key: 'fixedLtYn', label: '고정길이여부', colSpan: 3 },
        { key: 'insDt', label: '입력일시', colSpan: 3, hasBorderTop: true, render: (value) => formatDate(value as string)},
        { key: 'updDt', label: '수정일시', colSpan: 3, hasBorderTop: true, render: (value) => formatDate(value as string)},
    ];

    // 하단 테이블 컬럼 정보 정의
    const columns : IStaticColumnProps<ICdProps>[] = [
        { key: 'cdId', label: '코드', className: 'w-[100px]' },
        { key: 'cdNm', label: '코드명', className: 'w-[200px]', linkUrl : '/cds/', linkKeys : [ 'groupId', 'cdId' ] },
        { key: 'rm', label: '비고' },
        { key: 'sortOrdr', label: '정렬순서', className: 'text-left w-[100px]' },
        { key: 'useYn', label: '사용여부', className: 'text-left w-[100px]' },
    ];

    return (
        <div className="flex flex-1 flex-col gap-2 p-4">
            <h1 className="text-2xl font-bold mb-4">코드 그룹 &apos;{ cdGroup.groupNm }&apos; 상세</h1>
            <StaticDetailViewer<ICdGroupProps> data={ cdGroup } fields={ fields }>
                { cds && <StaticTable<ICdProps> data={ cds } columns={ columns } title="코드 목록" /> }
            </StaticDetailViewer>
            <View groupId={ groupId } />
        </div>
    );
}