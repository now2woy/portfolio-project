import { ButtionAreaProps } from '@/types/components/ButtonType'
import { LinkButton } from './LinkButton'

/**
 * 버튼 영역을 생성한다.
 * @param param
 * @returns
 */
export const ButtionArea = ({ buttons }: { buttons: ButtionAreaProps[] }) => {
    const leftButtons = buttons.filter(button => button.align === 'left' && button.isVisibility)
    const rightButtons = buttons.filter(button => button.align === 'right' && button.isVisibility)
    return (
        <div className="grid grid-cols-2 py-4">
            <div className="flex items-center space-x-2">
                {leftButtons.map(button =>
                    button.type === 'link' ? (
                        <LinkButton
                            key={button.name || ''}
                            name={button.name || ''}
                            variant={button.variant}
                            url={button.url}
                        />
                    ) : (
                        button.children
                    )
                )}
            </div>
            <div className="flex items-center justify-end space-x-2">
                {rightButtons.map(button =>
                    button.type === 'link' ? (
                        <LinkButton
                            key={button.name || ''}
                            name={button.name || ''}
                            variant={button.variant}
                            url={button.url}
                        />
                    ) : (
                        button.children
                    )
                )}
            </div>
        </div>
    )
}
