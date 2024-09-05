import styled from "styled-components";

export const Container = styled.div`
    margin: 10% 0 0 0;
    max-width: 800px;
`

export const TimeslotInformation = styled.p`

`

export const Timeslots = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`

export const Timeslot = styled.div`
    flex: 0 0 calc(5%);
    text-align: center;
    display: inline-block;
    border-radius: 15px;
    padding: 5px 20px;
    background-color: #E6F5F6;
    cursor: pointer;
`

export const Button = styled.button`
    margin: 3% 0 0 0;
    padding: 10px 20px;
    background-color: #FC6D5C;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;