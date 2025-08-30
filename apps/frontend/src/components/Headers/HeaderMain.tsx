import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

import {
    HeaderThemeDynamic,
    HeaderBreadcrumbDynamic
} from '@/components/Headers'

import { IMainMenuProps } from '@/types/components/MenuType'

export const HeaderMain = ({ menu }: { menu: IMainMenuProps[] }) => {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <HeaderBreadcrumbDynamic menus={menu} />
            </div>
            <HeaderThemeDynamic />
        </header>
    )
}
