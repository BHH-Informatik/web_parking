import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f4f7;
`;

export const ListItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #e0e0e0;
`;

export const Title = styled.div`
  width: 30%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Cell = styled.div`
  width: 30%;
  text-align: center;
  padding: 0 1% 0 1%;
`;

export const Button = styled.button`
    margin: 0 1% 0 1%;
    padding: 10px 20px;
    background-color: #FC6D5C;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin: 2px 0;
  box-sizing: border-box;
  border-radius: 5px;
`;
