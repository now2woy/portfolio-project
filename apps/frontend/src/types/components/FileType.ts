/**
 * 첨부 파일 Props 정의
 */
export interface IAtchFileProps {
    /**
     * 첨부파일ID
     */
    atchFileId: number
    /**
     * 첨부파일 순번
     */
    atchFileSeq: number
    /**
     * 첨부파일명
     */
    atchFileNm: string
    /**
     * 파일 용량
     */
    fileSize: number
}

/**
 *
 */
export interface IFileComponentProps {
    /**
     * 첨부파일ID
     */
    atchFileId?: number
    /**
     *
     */
    uploadFiles?: File[]
    /**
     *
     */
    attchFiles?: IAtchFileProps[]
    /**
     *
     */
    deleteFiles?: IAtchFileProps[]
}
