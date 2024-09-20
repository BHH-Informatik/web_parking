import styled from 'styled-components';

export const MainContainer = styled.div`
    margin: 0 auto;
    width: 90%;
    display: flex;
    align-items: center;
`;

export const HeaderContainer = styled.div`
    margin: 0 auto;
    width: 90%;
    display: flex;
    align-items: start;
    height: 10vh;
    justify-content: center;
`;

export const Container = styled.div`
    width: 100%;
`;

export const Error = styled.p``;

export const Title = styled.div`
    color: #3D3D3D;
    line-height: 1.5;
    width: 30%;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:hover {
        font-size: 1.1em;
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 5% 0;
    align-items: center;
`;

export const PageButton = styled.button`
    margin: 0 3% 0 3%;
    padding: 10px 20px;
    background-color: #FC6D5C;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
        background-color: #aaa;
        cursor: not-allowed;
    }
`;
