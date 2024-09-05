import styled from "styled-components";

export const Container = styled.div`
    padding: 3% 3% 0 3%;
    width: 75%;
`

export const ParkplatzInformation = styled.div`
    display: flex;
    align-items: center;
    gap: 50px;
    height: 50px;
`

export const ParkplatzStatusContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: #E6F5F6;
    border-radius: 15px;
    padding: 1% 3%;
`

export const StatusNumber = styled.div`
    background-color: white;
    border-radius: 15px;
    padding: 10px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StatusText = styled.p`

`

export const ColorInformationContainer = styled.div`
    display: flex;
    gap: 50px;
`

export const ColorInformation = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`

export const Color = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: ${({ color }) => color};
`

export const Information = styled.p`
    white-space: nowrap;
`



export const ParkingOverviewContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 15%;
    gap: 25px;
`;

export const ParkingTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
`;

export const TableRow = styled.tr`

`;


export const TableCell = styled.td`
    border: 3px solid #E6F5F6;
    text-align: left;
    padding: 2% 0 2% 0;
    text-align: center;

    &:first-child {
        border-left: none;
    }

    &:last-child {
        border-right: none;
    }

    span {
        display: inline-block;
        border-radius: 15px;
        padding: 5px 20px;
        background-color: ${({ status, isSelected }) => {
        if (isSelected) return '#FFCC97';
        if (status === 'gebucht') return '#FDB5AD';
        return '#E6F5F6';
        }};
        cursor: pointer;
    }
`;