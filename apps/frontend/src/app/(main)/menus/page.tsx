import type { Metadata } from "next";

import { MenuViewer } from "@/app/menus/client";
import { IMainMenuProps } from "@/types/components/MenuType";
import { fetchUserMenus } from '@/services/server/MenuServerService';

/**
 * 정적 메타 정의
 */
export const metadata : Metadata = {
  title : "메뉴 목록 - now2woy's Portfolio",
  description : "메뉴 목록을 조회하는 페이지입니다.",
};

/**
 * 코드 목록 서버 컴포넌트
 * @param param
 * @returns 
 */
export default async function ListViewer() {
    const menu : IMainMenuProps[] = await fetchUserMenus();

    return (
        <div className="flex flex-1 flex-col gap-2 p-4">
            <h1 className="text-2xl font-bold mb-4">메뉴 목록</h1>
            <MenuViewer menuData={menu} />
        </div>
    );
}