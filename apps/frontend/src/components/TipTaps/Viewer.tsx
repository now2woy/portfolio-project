import { FC } from 'react'
import { ITipTapViewerProps } from '@/types/TipTapType'

/**
 * TipTap 뷰어
 * @param param
 * @returns
 */
export const TiptapViewer: FC<ITipTapViewerProps> = ({ content }) => {
    return (
        <div className="prose min-h-[200px] max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}
