import "../globals.css";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { SidebarMain } from "@/components/Sidebars";
import { HeaderMain } from "@/components/Headers";
import { ThemeProvider } from "@/components/Themes";
import { IMainMenuProps } from "@/types/MenuType";

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  const menu: IMainMenuProps[] = await getNavData();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <SidebarProvider style={ { "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)", } as React.CSSProperties } >
              <SidebarMain menu={menu} />
              <SidebarInset>
                  <div className="container">
                      <HeaderMain menu={menu} />
                      <div className="flex flex-1 flex-col">
                          <div className="@container/main flex flex-1 flex-col gap-2">
                              {children}
                          </div>
                      </div>
                  </div>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}


// 메뉴 정보 조회
const getNavData = async () => {
    // TODO 데이터 조회 방식으로 변경 필요
    return [
        {
            title: "시스템",
            url: "/cds",
            icon: "Code",
            isActive: true,
            items: [
                {
                    title: "코드 관리",
                    url: "/cds",
                },
    /*
                {
                    title: "메뉴 관리",
                    url: "/menus",
                },
    */
            ],
        },
    /*
        {
            title: "메타",
            url: "/words",
            icon: "Abc",
            items: [
                {
                    title: "단어 관리",
                    url: "/words",
                },
                {
                    title: "도메인 관리",
                    url: "/domains",
                },
                {
                    title: "용어 관리",
                    url: "/terms",
                },
            ],
        },
    */
        {
            title: "게시판",
            url: "/boards",
            icon: "Notebook",
            isActive: true,
            items: [
            /*
                {
                    title: "게시판 관리",
                    url: "/boards",
                },
            */
                {
                    title: "공지사항",
                    url: "/posts/1",
                },
                {
                    title: "자유게시판",
                    url: "/posts/3",
                },
            ],
        },
    ];
};

export default RootLayout;