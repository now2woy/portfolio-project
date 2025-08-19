'use client';

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { buttonVariantType } from '@/components/Buttons';
import { cn } from '@/lib/utils';

/**
 * router.push(url) 처리하는 버튼
 * url이 없을 경우 router.back() 한다.
 * @param param
 * @returns 
 */
export const LinkButton = ({ name, variant, className, url }: { name:string, variant?:buttonVariantType, className?:string, url?: string }) => {
    const router = useRouter();

    const handleLink = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); 

        if (url) {
            // 지정된 URL로 이동
            router.push(url);
        } else {
            // 이전 페이지로 이동
            router.back();
        }
    }

    return <Button variant={ variant } className={ cn( "cursor-pointer", className ) } onClick={ handleLink }>{ name }</Button>
}