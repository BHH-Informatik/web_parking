import React, { useState, useEffect } from 'react';
import { Container, Timeslot, TimeslotInformation, Timeslots, Button } from './TimeslotPicker.styled'

const TimeslotPicker = ({ selectedParkplatz, bookingDate, blockedTimes, onBooking }) => {
    const timeslots = [
        '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00'
    ];

    const [startTimeslot, setStartTimeslot] = useState(null);
    const [endTimeslot, setEndTimeslot] = useState(null);

    useEffect(() => {
        if (blockedTimes.start_time && blockedTimes.end_time) {
            setStartTimeslot(blockedTimes.start_time);
            setEndTimeslot(blockedTimes.end_time);
        } else {
            setStartTimeslot(null);
            setEndTimeslot(null);
        }
    }, [blockedTimes]);

    const handleTimeslotClick = (timeslot) => {
        if (!startTimeslot) {
            setStartTimeslot(timeslot);
            setEndTimeslot(null);
        } else if (!endTimeslot && timeToMinutes(timeslot) > timeToMinutes(startTimeslot)) {
            setEndTimeslot(timeslot);
        } else if (endTimeslot && timeToMinutes(timeslot) < timeToMinutes(startTimeslot)) {
            setStartTimeslot(timeslot);
            setEndTimeslot(null);
        } else {
            setStartTimeslot(timeslot);
            setEndTimeslot(null);
        }
    };

    const handleBookingClick = () => {
        if (!selectedParkplatz || !startTimeslot || !endTimeslot) {
            alert('Bitte wähle einen Parkplatz und einen Timeslot aus.');
            return;
        }

        const [startTime] = startTimeslot.split(':');
        const [endTime] = endTimeslot.split(':');

        onBooking({
            parking_lot_id: selectedParkplatz,
            booking_date: bookingDate,
            start_time: `${startTime}:00`,
            end_time: `${endTime}:00`
        });
    };

    const timeToMinutes = (time) => {
        if (!time) return -1;
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const isBlocked = (timeslot) => {
        const { start_time, end_time } = blockedTimes;
        return isBetween(timeslot, start_time, end_time);
    };
    
    const isSelected = (timeslot) => {
        if (startTimeslot && !endTimeslot) {
            return timeslot === startTimeslot;
        }
        return isBetween(timeslot, startTimeslot, endTimeslot) || timeslot === startTimeslot || timeslot === endTimeslot;
    };
    
    const isBetween = (timeslot, start, end) => {
        const timeslotMinutes = timeToMinutes(timeslot);
        const startMinutes = timeToMinutes(start);
        const endMinutes = timeToMinutes(end);
        return startMinutes <= timeslotMinutes && timeslotMinutes <= endMinutes;
    };

    return (
        <>
            <Container>
                <TimeslotInformation>Wähle einen Timeslot</TimeslotInformation>
                <Timeslots>
                    {timeslots.map((timeslot, index) => (
                        <Timeslot
                            key={index}
                            onClick={() => handleTimeslotClick(timeslot)}
                            isStart={timeslot === startTimeslot}
                            isEnd={timeslot === endTimeslot}
                            isBetween={isBetween(timeslot, startTimeslot, endTimeslot)}
                            isSelected={isSelected(timeslot)}
                            isBlocked={isBlocked(timeslot)}
                        >
                            {timeslot}
                        </Timeslot>
                    ))}
                </Timeslots>
                <Button onClick={handleBookingClick}>Parkplatz buchen</Button>
            </Container>
        </>
    );
};

export default TimeslotPicker;
