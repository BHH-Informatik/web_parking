import React from 'react'
import { Container, Timeslot, TimeslotInformation, Timeslots, Button } from './TimeslotPicker.styled'

const TimeslotPicker = () => {
    const timeslots = [
        '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00'
    ];
    return (
        <>
            <Container>
                <TimeslotInformation>Wähle einen Timeslot</TimeslotInformation>
                <Timeslots>
                    {timeslots.map((timeslot, index) => (
                        <Timeslot key={index}>{timeslot}</Timeslot>
                    ))}
                </Timeslots>
                <Button>Parkplatz buchen</Button>
            </Container>
        </>
    )
}

export default TimeslotPicker