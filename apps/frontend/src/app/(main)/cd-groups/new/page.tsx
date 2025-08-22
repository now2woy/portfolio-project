import React from "react"
import { Metadata } from "next";
import { Edit } from "@/app/cd-groups/client"; 

/**
 * 정적 메타 정의
 */
export const metadata : Metadata = {
  title : "코드 신규 - now2woy's Portfolio",
  description : "코드 신규 등록하는 페이지입니다.",
};

/**
 * 신규 입력 컴포넌트
 * @param param
 * @returns 
 */
export default async function NewViewer( ) {
    return (
        <form>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h1 className="text-2xl font-bold mb-4">코드 신규</h1>
                <Edit />
            </div>
        </form>
    );
}