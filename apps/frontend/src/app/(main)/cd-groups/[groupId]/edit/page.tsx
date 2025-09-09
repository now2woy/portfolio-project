import React from 'react'

import { getCdGroup, fetchCds } from '@/services/server/CdGroupServerService'

import { Edit } from '@/app/cd-groups/client'

import { ICdProps } from '@/types/apps/CdGroupType'

/**
 * 메타 정보 생성
 * @param param
 * @returns
 */
export async function generateMetadata({ params }: { params: { groupId: string } }) {
    const { groupId } = await Promise.resolve(params)
    // API 호출
    const cdGroup = await getCdGroup({ groupId })

    return {
        title: `코드 그룹 '${cdGroup.groupNm}' 수정 - now2woy\'s Portfolio`,
        description: `코드 그룹 (${cdGroup.groupNm}) 수정 조회하는 페이지 입니다.`
    }
}

// TODO 페이지에서 사용 하는 코드를 전체 조회해야 한다.
const codes: ICdProps[] = [
    { groupId: 'YN_CD', cdId: 'Y', cdNm: '예', useYn: 'Y', sortOrdr: 1 },
    { groupId: 'YN_CD', cdId: 'N', cdNm: '아니오', useYn: 'Y', sortOrdr: 2 }
]

/**
 * 수정 컴포넌트
 * @param param
 * @returns
 */
export default async function EditViewer({ params }: { params: { groupId: string } }) {
    const { groupId } = await Promise.resolve(params)

    // API 호출
    const cdGroup = await getCdGroup({ groupId })
    const cds = await fetchCds({ groupId })

    return (
        <div className="flex flex-1 flex-col gap-2 p-4">
            <h1 className="mb-4 text-2xl font-bold">{`코드 그룹 ( ${cdGroup.groupNm}) 수정`}</h1>
            <Edit
                groupId={groupId}
                data={{ ...cdGroup, cds: cds }}
                codes={codes}
            />
        </div>
    )
}
