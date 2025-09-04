import '../globals.css'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { SidebarMain } from '@/components/Sidebars'
import { HeaderMain } from '@/components/Headers'
import { ThemeProvider } from '@/components/Themes'
import { IMainMenuProps } from '@/types/components/MenuType'
import { fetchUserMenus } from '@/services/server/MenuServerService'

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const menu: IMainMenuProps[] = await fetchUserMenus()

    return (
        <html
            lang="ko"
            suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange>
                    <SidebarProvider
                        style={
                            {
                                '--sidebar-width': 'calc(var(--spacing) * 72)',
                                '--header-height': 'calc(var(--spacing) * 12)'
                            } as React.CSSProperties
                        }>
                        <SidebarMain menu={menu} />
                        <SidebarInset>
                            <div className="container">
                                <HeaderMain menu={menu} />
                                <div className="flex flex-1 flex-col">
                                    <div className="@container/main flex flex-1 flex-col gap-2">{children}</div>
                                </div>
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout
