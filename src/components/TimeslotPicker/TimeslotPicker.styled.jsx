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
    background-color: #C0DBD7;
    cursor: pointer;
    border: ${(props) => {
        if (props.isBlocked) {
            return '2px solid #FC6D5C';
        }
        if (props.isSelected) {
            return '2px solid #FFCC97';
        }
        return 'none';
    }};
`;

export const Button = styled.button`
    border: none;
    background-color: #FC6D5C;
    color: white;
    border-radius: 7px;
    margin: 3% 0 0 0;
    padding: 2% 4%;
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.25);
    cursor: pointer;

    &:hover{
        background-color: #ff4530;
    }
`;