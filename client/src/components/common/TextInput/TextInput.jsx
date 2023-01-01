import { Input } from './Styles';

function TextInput(props) {
    const { type: _, ...otherProps } = props;
    return <Input type="text" {...otherProps} />;
}

export default TextInput;
