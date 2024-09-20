import styled from 'styled-components';

export const Container = styled.div`
    margin: 20px auto;
    height: 700px;
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: bold;
`;

export const NavigationButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
        color: #007bff;
    }
`;

export const CalendarWrapper = styled.div`
    .react-calendar {
        border: none;
        width: 100%;
        font-size: 1.2rem;
        background-color: #FFF4E9;
    }

    .react-calendar__navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 0 5% 0 5%;
    }

    .react-calendar__navigation__label {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .react-calendar__navigation__arrow {
        font-size: 2rem;
    }



    .react-calendar__tile--active {
        background: none;
        color: #000;
        position: relative;

        &:hover, &:active{
            background: none;
        }

    }

    .react-calendar__tile--active::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #ffcccb;
        z-index: 1;
    }

    .react-calendar__tile--active abbr {
        position: relative;
        z-index: 2;
    }

    .react-calendar__tile {
        height: 100px;
        }


    .highlighted {
        background: #ffcccb !important;
        color: #000;
        border-radius: 50%;
    }
`;
