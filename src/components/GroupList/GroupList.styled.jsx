import styled from 'styled-components';

export const MainContainer = styled.div`
    margin: 0 auto;
    width: 90%;
    display: flex;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    width: 100%;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #E6F5F6;
    padding: 10px;
    border-radius: 20px;
`;

export const ListItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
    color: #3D3D3D;
    line-height: 1.5;
    width: 30%;
    font-weight: bold;
`;

export const UserRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;

    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

export const UserCell = styled.div`
    width: 30%;
    color: #3D3D3D;
    line-height: 1.5;
`;
