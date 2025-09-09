import { LinkButton } from '@/components/Buttons/LinkButton'
import { MutationButton } from '@/components/Buttons/MutationButton'

import { ButtionAreaProps } from '@/types/components/ButtonType'

/**
 * 버튼 정보를 받아 버튼을 만든다.
 * @param param
 * @returns
 */
export const ButtionArea = ({ buttons }: { buttons: ButtionAreaProps[] }) => {
    const leftButtons = buttons.filter(button => button.align === 'left' && button.isVisibility)
    const rightButtons = buttons.filter(button => button.align === 'right' && button.isVisibility)

    const renderButton = (button: ButtionAreaProps, key: string) => {
        if (button.type === 'link') {
            return (
                <LinkButton
                    key={key}
                    name={button.name || ''}
                    variant={button.variant}
                    url={button.url}
                />
            )
        }
        if (button.type === 'mutation') {
            return (
                <MutationButton
                    key={key}
                    className={button.className}
                    variant={button.variant}
                    mutationFn={button.mutationFn!}
                    variables={button.variables}
                    confirmMessage={button.confirmMessage}
                    successMessage={button.successMessage}
                    errorMessage={button.errorMessage}
                    queryKeyToInvalidate={button.queryKeyToInvalidate}
                    onSuccessCallback={button.onSuccessCallback}
                    formRef={button.formRef}
                    files={button.files}>
                    {button.name}
                </MutationButton>
            )
        }
        return null
    }

    return (
        <div className="grid grid-cols-2 py-4">
            <div className="flex items-center space-x-2">{leftButtons.map((button, idx) => renderButton(button, `left-${idx}`))}</div>
            <div className="flex items-center justify-end space-x-2">{rightButtons.map((button, idx) => renderButton(button, `right-${idx}`))}</div>
        </div>
    )
}
