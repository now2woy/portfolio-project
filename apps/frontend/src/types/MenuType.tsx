// 메인 메뉴 정보 인터페이스
export interface IMainMenuProps {
    title: string;
    url: string;
    icon?: string;
    isActive?: boolean;
    items?: ISubMenuProps[]
}

// 서브 메뉴 정보 인터페이스
export interface ISubMenuProps {
    title: string;
    url: string;
}