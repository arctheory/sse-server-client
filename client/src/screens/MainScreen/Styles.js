import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
`;

const SafeArea = styled.main`
    width: 512px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Logo = styled.h1`
    font-size: 13px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
    color: orangered;
`;

const Title = styled.h2`
    margin: 0;
    font-weight: 400;
    font-size: 21px;
`;

const Caption = styled.p`
    margin: 0;
    font-size: 13px;
    color: #666666;
`;

export {
    Container,
    SafeArea,
    Title,
    Caption,
    Logo
};
