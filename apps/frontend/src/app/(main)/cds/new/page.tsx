import React from "react"
import { Metadata } from "next";
import { getAuthenticationToken } from '@/utils/CookiesUtils';
import { Edit } from "@/app/cds/client"; 

/**
 * 정적 메타 정의
 */
export const metadata : Metadata = {
  title : "코드 신규 - now2woy's Portfolio",
  description : "코드 신규 등록하는 페이지입니다.",
};

/**
 * 게시글 입력 컴포넌트
 * @param param
 * @returns 
 */
export default async function PostNew( ) {
    const authentication = await getAuthenticationToken();

    return (
        <form>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h1 className="text-2xl font-bold mb-4">코드 신규</h1>
                <Edit authentication={ authentication } />
            </div>
        </form>
    );
}