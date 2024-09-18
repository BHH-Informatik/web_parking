import React, { useState, useEffect } from 'react';
import { Container, ParkplatzInformation, ParkplatzStatusContainer, StatusNumber, StatusText, ColorInformationContainer, ColorInformation, Color, Information, ParkingOverviewContainer, TableRow, TableCell, ParkingTable, DateNavigationContainer, DateButton, DateDisplay } from './ParkplaetzeOverview.styled';
import TimeslotPicker from '../TimeslotPicker/TimeslotPicker';
import axios from 'axios';
import moment from 'moment';
 
const ParkplaetzeOverview = () => {
    const [selectedParkplatz, setSelectedParkplatz] = useState(null);
    const [parkingLots, setParkingLots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState(moment().startOf('day'));
    const [blockedTimes, setBlockedTimes] = useState({ start_time: null, end_time: null });

    useEffect(() => {
        const fetchParkingData = async () => {
            try {
                const formattedDate = currentDate.format('YYYY-MM-DD');
                const response = await axios.get(`https://parking.enten.dev/api/parking_lots/${formattedDate}`);
                setParkingLots(response.data.parking_lots);
                setIsLoading(false);
                console.log(parkingLots)
            } catch (error) {
                console.error('Fehler beim Laden der Parkplatzdaten:', error);
                setError('Fehler beim Laden der Daten');
                setIsLoading(false);
            }
        };
        fetchParkingData();
    }, [currentDate]);


    const splitIntoPairs = (array) => {
        let pairs = [];
        for (let i = 0; i < array.length; i += 2) {
            pairs.push([array[i], array[i + 1]]);
        }
        return pairs;
    };

    const splitIntoGroups = (array, size) => {
        let groups = [];
        for (let i = 0; i < array.length; i += size) {
            groups.push(array.slice(i, i + size));
        }
        return groups;
    };

    const fillTable = (tableData, expectedRows, expectedColumns) => {
        const filledTable = [...tableData];
        for (let i = 0; i < expectedRows; i++) {
            if (!filledTable[i]) {
                filledTable[i] = Array.from({ length: expectedColumns }, () => ({ name: '', status: 'frei' }));
            } else {
                for (let j = filledTable[i].length; j < expectedColumns; j++) {
                    filledTable[i].push({ name: '', status: 'frei' });
                }
            }
        }
        return filledTable;
    };

    const handleBooking = async (bookingDetails) => {
        try {
            const token = localStorage.getItem('access_token');

            await axios.post('https://parking.enten.dev/api/booking/reserve', bookingDetails, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            alert('Parkplatz erfolgreich gebucht!');
            setSelectedParkplatz(null);
        } catch (error) {
            console.error('Fehler beim Buchen des Parkplatzes:', error);
            alert('Fehler beim Buchen des Parkplatzes. Bitte versuche es später erneut.');
        }
    };

    if (isLoading) {
        return <div>Lade Parkplatzdaten...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const parkplatzDaten = parkingLots.map(lot => ({
        ...lot,
    }));

    const parkplatzPaare = splitIntoPairs(parkplatzDaten);
    const parkplatzGruppen = splitIntoGroups(parkplatzPaare, 5);
    const filledTables = parkplatzGruppen.map(group => fillTable(group, 5, 2));

    const handleClick = (lot) => {
        const { id, name, status, extras } = lot;

        setSelectedParkplatz(id);

        if (status === 'FULL_DAY_BLOCKED') {
            setBlockedTimes({
                start_time: '6:00',
                end_time: '20:00'
            });
        } else if (status === 'TIMERANGE_BLOCKED' && extras) {
            setBlockedTimes({
                start_time: extras.start_time,
                end_time: extras.end_time
            });
        } else {
            setBlockedTimes({ start_time: null, end_time: null });
        }
    };
    const handleDateChange = (direction) => {
        setCurrentDate(prevDate => {
            const newDate = direction === 'prev' ? prevDate.clone().subtract(1, 'day') : prevDate.clone().add(1, 'day');
            setSelectedParkplatz(null);
            return newDate;
        });
    };
      
    return (
        <>
            <Container>
                <ParkplatzInformation>
                    <ParkplatzStatusContainer>
                        <StatusNumber>4</StatusNumber>
                        <StatusText>Voll</StatusText>
                        <StatusNumber>16</StatusNumber>
                        <StatusText>Leer</StatusText>
                    </ParkplatzStatusContainer>
                    <ColorInformationContainer>
                        <ColorInformation>
                            <Color color="#FDB5AD" />
                            <Information>Gebucht</Information>
                        </ColorInformation>
                        <ColorInformation>
                            <Color color="#E6F5F6" />
                            <Information>Frei</Information>
                        </ColorInformation>
                        <ColorInformation>
                            <Color color="#FFCC97" />
                            <Information>Deine Auswahl</Information>
                        </ColorInformation>
                    </ColorInformationContainer>
                </ParkplatzInformation>

                <DateNavigationContainer>
                    <DateButton onClick={() => handleDateChange('prev')}>{'<'}</DateButton>
                    <DateDisplay>{currentDate.format('YYYY-MM-DD')}</DateDisplay>
                    <DateButton onClick={() => handleDateChange('next')}>{'>'}</DateButton>
                </DateNavigationContainer>

                <ParkingOverviewContainer>
                    {filledTables.map((tableData, index) => (
                        <ParkingTable key={index}>
                            <tbody>
                                {tableData.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <TableCell key={cellIndex} status={cell && cell.status} isSelected={selectedParkplatz === cell.id} onClick={() => handleClick(cell)}>
                                                <span>{cell && cell.name}</span>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </tbody>
                        </ParkingTable>
                    ))}
                </ParkingOverviewContainer>
                <TimeslotPicker selectedParkplatz={selectedParkplatz} bookingDate={currentDate.format('YYYY-MM-DD')} blockedTimes={blockedTimes} onBooking={handleBooking} />
            </Container>

        </>
    );
};

export default ParkplaetzeOverview;
