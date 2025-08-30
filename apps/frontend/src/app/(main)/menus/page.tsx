import type { Metadata } from "next";

import { MenuViewer } from "@/app/menus/client";
import { fetchAllMenus } from '@/services/server/MenuServerService';

import { IFormFieldProps } from '@/types/components/ViewType';
import { IMainMenuProps } from "@/types/components/MenuType";

// 입력 / 수정 필드 레이아웃 정의
const fields : IFormFieldProps<IMainMenuProps>[] = [
    { key : 'menuId', label : '메뉴ID', colSpan : 6, type : 'viewer', required : false },
    { key : 'upMenuId', label : '상위메뉴ID', colSpan : 6, type : 'viewer', required : false },
    { key : 'menuNm', label : '메뉴명', colSpan : 6, type : 'text', required : true },
    { key : 'linkUrl', label : '링크URL', colSpan : 6, type : 'text', required : false },
    { key : 'iconCd', label : '아이콘', colSpan : 6, type : 'text', required : false },
    { key : 'sortOrd', label : '정렬순서', colSpan : 6, type : 'viewer', required : false },
    { key : 'useYn', label : '사용여부', colSpan : 6, type : 'select', required : true, options : [ { value : 'Y', label : '예' }, { value : 'N', label : '아니오' } ] },
    { key : 'insDt', label : '입력일시', colSpan : 6, type : 'viewer', required : false },
    { key : 'updDt', label : '수정일시', colSpan : 6, type : 'viewer', required : false },
];

/**
 * 정적 메타 정의
 */
export const metadata : Metadata = {
  title : "메뉴 관리 - now2woy's Portfolio",
  description : "메뉴를 관리하는 페이지입니다.",
};

/**
 * 목록 서버 컴포넌트
 * @param param
 * @returns 
 */
export default async function ListViewer() {
    const menu : IMainMenuProps[] = await fetchAllMenus();

    return (
        <div className="flex flex-1 flex-col gap-2 p-4">
            <h1 className="text-2xl font-bold mb-4">메뉴 관리</h1>
            <MenuViewer menuData={ menu } fields={ fields } />
        </div>
    );
}