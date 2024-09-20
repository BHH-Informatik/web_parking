import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff4e9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 4px 15px 4px;
  background-color: #0393a319;
  border-radius: 8px;
  margin-bottom: 15px;
`;

export const ListItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 6px 2px 6px;
  border-bottom: 1px solid #ddd;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.div`
  width: 20%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #333;
`;

export const Cell = styled.div`
  width: 20%;
  text-align: center;
  padding: 2px;
  font-size: 0.9rem;
  color: #555;
`;

export const Button = styled.button`
  margin: 0 5px;
  padding: 8px 15px;
  background-color: #FC6D5C;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e05a48;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(252, 109, 92, 0.4);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 2px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #FC6D5C;
    box-shadow: 0 0 0 2px rgba(252, 109, 92, 0.2);
  }
`;
