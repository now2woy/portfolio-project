'use client';
import dynamic from 'next/dynamic';

import { IMainMenuProps } from "@/types/MenuType";

const HeaderTheme = dynamic( () => import( '@/components/Headers' ).then( ( mod ) => mod.HeaderTheme ), {
    ssr: false
  }
);

const HeaderBreadcrumb = dynamic( () => import( '@/components/Headers' ).then( ( mod ) => mod.HeaderBreadcrumb ), {
    ssr: false
  }
);

// 하나의 파일 안에서 다이나믹 처리가 안되어 파일 분리
export const HeaderThemeDynamic = () => {
  return <HeaderTheme />;
}

// 하나의 파일 안에서 다이나믹 처리가 안되어 파일 분리
export const HeaderBreadcrumbDynamic = ({ menus }: { menus: IMainMenuProps[] }) => {
  return <HeaderBreadcrumb menus={menus} />;
}

