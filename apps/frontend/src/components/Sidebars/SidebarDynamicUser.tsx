'use client';

import dynamic from 'next/dynamic';
import { ISidebarUserProps } from '@/components/Sidebars';

const SidebarUser = dynamic( () => import( '@/components/Sidebars' ).then( ( mod ) => mod.SidebarUser ), {
    ssr: false
  }
);

// 하나의 파일 안에서 다이나믹 처리가 안되어 파일 분리
export const SidebarDynamicUser = ( props: ISidebarUserProps ) => {
  return <SidebarUser { ...props } />;
}