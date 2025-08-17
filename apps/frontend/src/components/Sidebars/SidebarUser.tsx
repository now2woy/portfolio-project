'use client';
import { useRouter } from 'next/navigation';

import axios from "axios";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { IconCreditCard, IconDotsVertical, IconLogout, IconNotification, IconUserCircle } from "@tabler/icons-react"

// 사용자 정보 인터페이스
export interface ISidebarUserProps {
    avatar?: string;
    name: string;
    email: string;
};

export const SidebarUser = ({ avatar, name, email }: ISidebarUserProps ) => {
    const { isMobile } = useSidebar();
    const router = useRouter();

    // 로그아웃 이벤트 헨들러
    const handleLogout = (event: React.MouseEvent<HTMLDivElement>) => {
        axios.post(`/api/system/v1/auths/logout`, null, {
            headers: {
                'Content-Type': 'application/json',
            }
            , withCredentials: true
        })
        .then(response => {
            // 로그아웃 성공
            console.log("로그아웃 성공");
            // 로그아웃 성공 후 메인 페이지로 이동
            router.push('/login');
        })
        .catch(error => {  
            // 로그아웃 실패
            console.error("로그아웃 실패 : ", error);
        });
    };

    return (
      <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <Avatar className="h-8 w-8 rounded-lg grayscale">
                            <AvatarImage src={avatar} alt={name} />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{name}</span>
                            <span className="text-muted-foreground truncate text-xs">
                                {email}
                            </span>
                        </div>
                        <IconDotsVertical className="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={avatar} alt={name} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{name}</span>
                                <span className="text-muted-foreground truncate text-xs">{email}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem><IconUserCircle />Account</DropdownMenuItem>
                        <DropdownMenuItem><IconCreditCard />Billing</DropdownMenuItem>
                        <DropdownMenuItem><IconNotification />Notifications</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}><IconLogout />Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
    );
}