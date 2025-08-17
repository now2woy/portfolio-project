import { ChevronRight } from "lucide-react"

import Link from 'next/link';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

import { IconCode, IconAbc, IconNotebook, IconInnerShadowTop } from "@tabler/icons-react"

import { SidebarDynamicUser, ISidebarUserProps } from "@/components/Sidebars";
import { IMainMenuProps } from "@/types/MenuType";

export const SidebarMain = async ( { menu }: { menu: IMainMenuProps[] } ) => {
    const user: ISidebarUserProps = await getUserData();

    // 아이콘 이름과 컴포넌트를 매핑하는 객체
    const iconMap = {
        Code: IconCode,
        Abc: IconAbc,
        Notebook: IconNotebook,
    };
    
    return (
      <Sidebar collapsible="offcanvas" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link href="/">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">now2woy&apos;s Potfolio</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                        <SidebarMenu>
                            {menu.map(item => {
                                const Icon = iconMap[item.icon as keyof typeof iconMap] || null;
                                return (
                                    <Collapsible key={ item.title } asChild defaultOpen={ item.isActive } className="group/collapsible">
                                    <SidebarMenuItem>

                                        <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            <Icon className="mr-2 h-4 w-4" />
                                            <span>{ item.title }</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={subItem.url}>
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                        </CollapsibleContent>

                                    </SidebarMenuItem>
                                    </Collapsible>
                            ) } ) }
                        </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarDynamicUser { ...user } />
            </SidebarFooter>
          </Sidebar>
    );
}

// 사용자 정보 조회
const getUserData = async () => {
    // TODO 데이터 조회 방식으로 변경 필요
    return {
        name: "now2woy",
        email: "now2woy@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    };
};
