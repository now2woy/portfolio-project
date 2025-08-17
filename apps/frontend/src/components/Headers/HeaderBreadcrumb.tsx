'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

import { IMainMenuProps } from "@/types/MenuType";

export const HeaderBreadcrumb = ({ menus }: { menus: IMainMenuProps[] }) => {
    const pathname = usePathname();
    const breadcrumbItems = getBreadcrumbItems({ menus, pathname });

    // 일치하는 메뉴가 없으면 아무것도 렌더링하지 않음
    if (breadcrumbItems.length === 0) {
        return null;
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={breadcrumbItems[0].url}>
                        {breadcrumbItems[0].title}
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumbItems[1].title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

// 현재 URL에 해당하는 메뉴의 경로를 찾는 함수
function getBreadcrumbItems({menus, pathname}: {menus: IMainMenuProps[], pathname: string | null}) {
    // 부모 메뉴와 현재 메뉴를 찾기 위한 루프
    for (const parentMenu of menus) {
        // 하위 메뉴가 없을 경우 생략
        if (!parentMenu.items) continue;

        // 현재 URL이 하위 메뉴의 URL과 일치하는지 확인
        for (const item of parentMenu.items) {
            if (item.url === pathname) {
                return [
                    { title: parentMenu.title, url: parentMenu.url }
                    , { title: item.title, url: item.url }
                ];
            }
        }
    }

    return []; // 일치하는 메뉴가 없는 경우 빈 배열 반환
}