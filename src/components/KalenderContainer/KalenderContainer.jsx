import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Header, NavigationButton, CalendarWrapper } from './KalenderContainer.styled';
import moment from 'moment';

const KalenderContainer = () => {
    const [date, setDate] = useState(new Date());
    const [highlightedDays, setHighlightedDays] = useState([]);

    const handleDateChange = newDate => {
        setDate(newDate);
    };

    const handleMonthChange = (activeStartDate) => {
        setDate(activeStartDate);
    };

    const handleDayClick = day => {
        const formattedDate = moment.utc(day).startOf('day').add(1, 'day').format('YYYY-MM-DD');
        if (highlightedDays.includes(formattedDate)) {
            setHighlightedDays(highlightedDays.filter(d => d !== formattedDate));
        } else {
            setHighlightedDays([...highlightedDays, formattedDate]);
        }
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = moment.utc(date).startOf('day').format('YYYY-MM-DD');
            return highlightedDays.includes(formattedDate) ? 'highlighted' : (date.getMonth() !== date.getMonth() ? 'disabled' : '');
        }
        return '';
    };

    return (
        <Container>
            <CalendarWrapper>
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    tileClassName={tileClassName}
                    onActiveStartDateChange={({ activeStartDate }) => handleMonthChange(activeStartDate)}
                    showNeighboringMonth={true}
                    prev2Label={null}
                    next2Label={null}
                    onClickDay={handleDayClick}
                />
            </CalendarWrapper>
        </Container>
    );
};

export default KalenderContainer;
