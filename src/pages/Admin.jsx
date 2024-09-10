import React, { useState } from 'react';
import { ListComp } from '../components';
import { Container, Title } from '../components/ListComp/ListComp.styled';
import styled from 'styled-components';

const MainContainer = styled.div`
    margin: 0 auto;
    width: 90%;
    display: flex;
    height: 90vh;
`

const HeaderContainer = styled.div`
    margin: 0 auto;
    width: 90%;
    display: flex;
    align-items: start;

    height: 10vh;
`

const Admin = () => {

  const title = {
    users: [
      { key: 'name', name: 'Name' },
      { key: 'email', name: 'E-Mail' },
      { key: 'group', name: 'Gruppe' }
    ],
    groups: [
      { key: 'group', name: 'Gruppe' },
      { key: 'description', name: 'Bezeichnung' }
    ],
    parking: [
      { key: 'parkingSpot', name: 'Pakplatz' },
      { key: 'available', name: 'Status' }
    ],
    bookings: [
      { key: 'user', name: 'Nutzer' },
      { key: 'parkingSpot', name: 'Parkplatz' },
      { key: 'date', name: 'Datum' }
    ]
  };
  const userData = [
    { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
    { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
    { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' }
  ];

  const groupData = [
    { group: 'Gruppe 1', description: 'Parkplatz-Administratoren' },
    { group: 'Gruppe 2', description: 'Standardbenutzer' }
  ];

  const parkingData = [
    { parkingSpot: 'A1', available: true },
    { parkingSpot: 'B2', available: false }
  ];

  const bookingData = [
    { user: 'Max Mustermann', parkingSpot: 'A1', date: '2024-09-01' },
    { user: 'Max Mustermann', parkingSpot: 'B2', date: '2024-09-02' }
  ];

  // Zustand, um den aktuell ausgewählten Titel zu speichern
  const [selectedData, setSelectedData] = useState(userData);

  // Definiere die Titel mit einem Klick-Handler
  const titles = [
    { key: 'users', name: 'Nutzer', data: userData },
    { key: 'groups', name: 'Gruppe', data: groupData },
    { key: 'parking', name: 'Parkplätze', data: parkingData },
    { key: 'bookings', name: 'Buchungen', data: bookingData }
  ];

  const [selectedTitle, setSelectedTitle] = useState(titles[0]);

  const handleTitleClick = (title) => {
    setSelectedData(title.data); // Ändere die angezeigten Daten basierend auf dem Titel
    setSelectedTitle(title); // Setze den ausgewählten Titel
  };

  return (
    <>
      <MainContainer>
        <Container>
          <HeaderContainer>
            {titles.map((title) => (
              <Title key={title.key} onClick={() => handleTitleClick(title)}>
                {title.name}
              </Title>
            ))}
          </HeaderContainer>
          <ListComp data={selectedData} title={title[selectedTitle.key]} />
        </Container>
      </MainContainer>
    </>
  );
};

export default Admin;