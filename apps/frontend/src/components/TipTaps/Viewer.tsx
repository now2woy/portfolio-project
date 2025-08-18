import { FC } from 'react';
import { ITipTapViewerProps } from '@/types/TipTapType';

/**
 * TipTap 뷰어
 * @param param
 * @returns 
 */
export const TiptapViewer: FC<ITipTapViewerProps> = ({ content }) => {
    return (
        <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};