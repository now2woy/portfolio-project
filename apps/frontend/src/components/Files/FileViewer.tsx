import { IconPaperclip } from '@tabler/icons-react'
import { FileDownLoadLink } from '@/components/Files/FileDownLoadLink'

import { IAtchFileProps } from '@/types/components/FileType'

/**
 *
 * @param param
 */
export const FileViewer = ({ files }: { files?: IAtchFileProps[] }) => {
    return (
        <ul
            role="list"
            className="mt-4 divide-y divide-gray-100 rounded-md border border-gray-200">
            {files &&
                files.map(file => (
                    <li
                        key={file.atchFileSeq}
                        className="flex items-center justify-between py-4 pr-5 pl-4 text-sm">
                        <div className="flex w-0 flex-1 items-center">
                            <IconPaperclip color="gray" />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className="truncate font-medium text-gray-900">
                                    <FileDownLoadLink
                                        atchFileId={file.atchFileId}
                                        atchFileSeq={file.atchFileSeq}
                                        atchFileNm={file.atchFileNm}
                                    />
                                </span>
                                <span className="shrink-0 text-gray-400">{(file.fileSize / 1024 / 1024).toFixed(1)} MB</span>
                            </div>
                        </div>
                    </li>
                ))}
        </ul>
    )
}
