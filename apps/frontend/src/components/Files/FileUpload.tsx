import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { IAtchFileProps, IFileComponentProps } from '@/types/components/FileType'

export function FileUpload({ atchFiles, handleAtachFiles }: { atchFiles: IFileComponentProps; handleAtachFiles: (uploadFiles: File[], deleteFiles: IAtchFileProps[]) => void }) {
    // 새로 추가되는 파일
    const [files, setFiles] = useState<File[]>(atchFiles?.uploadFiles || [])
    // 기존 서버 파일
    const [serverFiles, setServerFiles] = useState<IAtchFileProps[]>(atchFiles?.attchFiles || [])
    // 삭제된 서버 파일
    const [deletedServerFiles, setDeletedServerFiles] = useState<IAtchFileProps[]>(atchFiles?.deleteFiles || [])

    // 허용 확장자, 최대 용량
    const allowedExtensions = ['doc', 'docx', 'jar', 'png']
    const maxFileSizeMB = 1
    const maxFileSize = maxFileSizeMB * 1024 * 1024
    const maxTotalSizeMB = 2
    const maxTotalSize = maxTotalSizeMB * 1024 * 1024

    const validateFile = (file: File) => {
        const ext = file.name.split('.').pop()?.toLowerCase()
        if (!ext || !allowedExtensions.includes(ext)) {
            alert(`허용되지 않는 파일 형식입니다: ${file.name}`)
            return false
        }
        if (files.some(f => f.name === file.name)) {
            alert(`이미 동일한 파일이 업로드되어 있습니다: ${file.name}`)
            return false
        }
        const currentTotal = [...files, ...serverFiles].reduce((acc, f) => acc + ('fileSize' in f ? f.fileSize : f.size), 0)
        if (currentTotal + file.size > maxTotalSize) {
            alert(`총 업로드 용량이 초과됩니다. (최대 ${maxTotalSizeMB}MB 허용)`)
            return false
        }
        return true
    }

    const addFiles = (newFiles: FileList | null) => {
        if (!newFiles) return
        const validFiles = Array.from(newFiles).filter(validateFile)
        if (validFiles.length > 0) {
            const updatedFiles = [...files, ...validFiles]
            setFiles(updatedFiles)
            handleAtachFiles(updatedFiles, deletedServerFiles)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        addFiles(e.target.files)
        e.target.value = ''
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        addFiles(e.dataTransfer.files)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const removeNewFile = (fileName: string) => {
        setFiles(prev => prev.filter(f => f.name !== fileName))
    }

    const removeServerFile = (file: IAtchFileProps) => {
        setServerFiles(prev => prev.filter(f => f.atchFileSeq !== file.atchFileSeq))
        const updatedDeleteFiles = [...deletedServerFiles, file]
        setDeletedServerFiles(updatedDeleteFiles)
        handleAtachFiles(files, updatedDeleteFiles)
    }

    const totalSizeMB = ([...files, ...serverFiles].reduce((acc, f) => acc + ('fileSize' in f ? f.fileSize : f.size), 0) / 1024 / 1024).toFixed(1)

    return (
        <div className="border-t px-4 pt-4 pb-2 sm:col-span-2 sm:px-0">
            <dt className="text-sm leading-6 font-semibold">첨부파일</dt>
            <dd className="text-muted-foreground mt-1 mt-2 text-sm leading-6">
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="mx-auto size-12 text-gray-300">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6Z"
                            />
                        </svg>
                        <div className="mt-4 flex text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 hover:text-indigo-500">
                                <span>파일 선택</span>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="sr-only"
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </label>
                            <p className="pl-1">또는 파일 드래그 & 드롭</p>
                        </div>
                        <p className="text-xs text-gray-600">
                            허용 형식 : {allowedExtensions.join(', ')} / 개별 최대 : {maxFileSizeMB}MB / 총합 : {maxTotalSizeMB}MB
                        </p>
                    </div>
                </div>

                {/* 파일 리스트 */}
                {[...serverFiles, ...files].length > 0 && (
                    <>
                        <div className="mt-2 text-sm text-gray-600">
                            현재 총 용량: <span className="font-medium">{totalSizeMB}MB</span> / {maxTotalSizeMB}MB
                        </div>
                        <ul
                            role="list"
                            className="mt-4 divide-y divide-gray-100 rounded-md border border-gray-200">
                            {serverFiles.map(file => (
                                <li
                                    key={`server-${file.atchFileSeq}`}
                                    className="flex items-center justify-between py-4 pr-5 pl-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                        <span className="truncate font-medium text-gray-900">{file.atchFileNm}</span>
                                        <span className="ml-2 shrink-0 text-gray-400">{(file.fileSize / 1024 / 1024).toFixed(1)} MB</span>
                                    </div>
                                    <button
                                        onClick={() => removeServerFile(file)}
                                        className="ml-4 shrink-0 text-gray-400 hover:text-red-500">
                                        <Trash2 className="size-5" />
                                    </button>
                                </li>
                            ))}
                            {files.map(file => (
                                <li
                                    key={`new-${file.name}`}
                                    className="flex items-center justify-between py-4 pr-5 pl-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                        <span className="truncate font-medium text-gray-900">{file.name}</span>
                                        <span className="ml-2 shrink-0 text-gray-400">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                                    </div>
                                    <button
                                        onClick={() => removeNewFile(file.name)}
                                        className="ml-4 shrink-0 text-gray-400 hover:text-red-500">
                                        <Trash2 className="size-5" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </dd>
        </div>
    )
}
