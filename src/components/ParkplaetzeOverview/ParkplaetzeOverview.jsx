import React, { useState } from 'react';
import { Container, ParkplatzInformation, ParkplatzStatusContainer, StatusNumber, StatusText, ColorInformationContainer, ColorInformation, Color, Information, ParkingOverviewContainer, TableRow, TableCell, ParkingTable } from './ParkplaetzeOverview.styled';
import TimeslotPicker from '../TimeslotPicker/TimeslotPicker';


const ParkplaetzeOverview = () => {
    const [selectedParkplatz, setSelectedParkplatz] = useState(null);


    const parkplatzDaten = [
        { name: 'P1', status: 'frei' },
        { name: 'P2', status: 'gebucht' },
        { name: 'P3', status: 'frei' },
        { name: 'P4', status: 'frei' },
        { name: 'P5', status: 'gebucht' },
        { name: 'P6', status: 'frei' },
        { name: 'P7', status: 'frei' },
        { name: 'P8', status: 'gebucht' },
        { name: 'P9', status: 'frei' },
        { name: 'P10', status: 'frei' },
        { name: 'P11', status: 'frei' },
        { name: 'P12', status: 'gebucht' },
        { name: 'P13', status: 'frei' },
        { name: 'P14', status: 'frei' },
        { name: 'P15', status: 'frei' },
        { name: 'P16', status: 'frei' },
        { name: 'P17', status: 'frei' },
        { name: 'P18', status: 'frei' },
        { name: 'P19', status: 'frei' },
        { name: 'P20', status: 'frei' },
    ];

    const splitIntoPairs = (array) => {
        let pairs = [];
        for (let i = 0; i < array.length; i += 2) {
            pairs.push([array[i], array[i + 1]]);
        }
        return pairs;
    };

    const parkplatzPaare = splitIntoPairs(parkplatzDaten);

    const splitIntoGroups = (array, size) => {
        let groups = [];
        for (let i = 0; i < array.length; i += size) {
            groups.push(array.slice(i, i + size));
        }
        return groups;
    };

    const parkplatzGruppen = splitIntoGroups(parkplatzPaare, 5);

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

    const filledTables = parkplatzGruppen.map(group => fillTable(group, 5, 2));

    const handleClick = (name, status) => {
        if (status !== 'gebucht') {
            setSelectedParkplatz(name);
        }
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

                <ParkingOverviewContainer>
                    {filledTables.map((tableData, index) => (
                        <ParkingTable key={index}>
                            <tbody>
                                {tableData.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <TableCell key={cellIndex} status={cell && cell.status} isSelected={selectedParkplatz === cell.name} onClick={() => handleClick(cell.name, cell.status)}>
                                                <span>{cell && cell.name}</span>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </tbody>
                        </ParkingTable>
                    ))}
                </ParkingOverviewContainer>
                <TimeslotPicker/>
            </Container>

        </>
    );
};

export default ParkplaetzeOverview;
