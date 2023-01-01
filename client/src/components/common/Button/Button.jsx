import { DefaultButton, ProcessOverlay } from './Styles';
import { Spinner } from 'react-activity'

function Button(props) {
    const {
        children,
        isLoading = false,
        disabled = false,
        ...otherProps
    } = props;

    return (
        <DefaultButton disabled={!isLoading && disabled} {...otherProps}>
            {children}
            {isLoading && (
                <ProcessOverlay>
                    <Spinner color="orangered" size={12} />
                </ProcessOverlay>
            )}
        </DefaultButton>
    );
}

export default Button;
