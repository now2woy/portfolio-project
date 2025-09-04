'use client'

/**
 * 첨부파일 다운로드 링크를 생성한다.
 * @param param
 * @returns
 */
export const FileDownLoadLink = ({ atchFileId, atchFileSeq, atchFileNm }: { atchFileId: number; atchFileSeq: number; atchFileNm: string }) => {
    const handleClick = async () => {
        const res = await fetch(`/bff/attch-files/${atchFileId}/${atchFileSeq}`)
        const { url } = await res.json()
        window.location.href = url
    }

    return <button onClick={handleClick}>{atchFileNm}</button>
}
