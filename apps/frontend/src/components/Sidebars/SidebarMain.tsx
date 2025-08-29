import { ChevronRight } from "lucide-react"

import Link from 'next/link';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

import { IconCode, IconAbc, IconNotebook, IconInnerShadowTop } from "@tabler/icons-react"

import { SidebarDynamicUser } from "@/components/Sidebars";
import { IMainMenuProps } from "@/types/components/MenuType";

export const SidebarMain = async ( { menu }: { menu: IMainMenuProps[] } ) => {
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
                            { menu.map( item => {
                                const Icon = iconMap[ item.iconCd as keyof typeof iconMap ] || null;
                                return (
                                    <Collapsible key={ item.menuId } asChild defaultOpen={ true } className="group/collapsible">
                                    <SidebarMenuItem>

                                        <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={ item.menuNm }>
                                            <Icon className="mr-2 h-4 w-4" />
                                            <span>{ item.menuNm }</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                        <SidebarMenuSub>
                                            { item.children?.map( ( subItem ) => (
                                            <SidebarMenuSubItem key={ subItem.menuId }>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={ subItem.linkUrl || '' }>
                                                        <span>{ subItem.menuNm }</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            ) ) }
                                        </SidebarMenuSub>
                                        </CollapsibleContent>

                                    </SidebarMenuItem>
                                    </Collapsible>
                            ) } ) }
                        </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarDynamicUser />
            </SidebarFooter>
          </Sidebar>
    );
}
