import { useLayoutEffect, useRef, useState } from 'react';
import { Container } from './Styles';

function Island(props) {
    const { children, ...otherProps } = props;
    const ref = useRef();
    const [height, setHeight] = useState(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        setHeight(ref.current?.clientHeight ?? 0);
    });

    return (
        <Container
            {...otherProps}
            ref={ref}
            containerHeight={height}>
                {children}
        </Container>
    );
}

export default Island;
