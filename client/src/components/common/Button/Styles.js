import styled from 'styled-components';

const DefaultButton = styled.button`
    margin-top: 12px;
    width: 100%;
    background-color: orangered;
    padding: 12px 0;
    border-radius: 6px;
    color: white;
    font-size: 16px;
    border: none;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    :disabled {
        background-color: #999999;
        cursor: not-allowed;
    }
`;

const ProcessOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,0.9);
`;

export {
    DefaultButton,
    ProcessOverlay
};
