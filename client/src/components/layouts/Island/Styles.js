import styled from 'styled-components';

const Container = styled.section`
    padding: 16px;
    border: 1px #e9e9e9 solid;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    background-color: white;
    display: ${props => (props.visible ?? true) ? 'flex' : 'none'};
    position: relative;
    ${props => props.inactive ? `
        margin-bottom: ${props.last ? 0 : `-${props.containerHeight / 1.5}`}px;
        filter: grayscale();
        pointer-events: none;
        
        > * {
            opacity: 0.2;
            user-select: none;
        }
    ` : ''}
`;

export {
    Container
};
