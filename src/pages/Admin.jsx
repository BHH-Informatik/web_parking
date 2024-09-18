import React, { useEffect, useState } from 'react';
import { ListComp } from '../components';
import styled from 'styled-components';
import axios from 'axios';

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

const Container = styled.div`
    width: 100%;
`;

const Error = styled.p``

const Title = styled.div`
    color: #3D3D3D;
    line-height: 1.5;
    width: 30%;
    font-weight: bold;
    cursor: pointer;

    &:hover{
    font-size: 1.1em;
    }
`;

const Admin = () => {

  const [user, setUser] = useState([]);
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkAPI = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const responseUser = await axios.get('https://parking.enten.dev/api/admin/user', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          const responseBooking = await axios.get('https://parking.enten.dev/api/admin/bookings', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          setUser(responseUser.data);
          setBooking(responseBooking.data);
        } catch (error) {
          console.error('Token validation failed:', error);
        }
      } else {
        setError(true);
      }
    };

    checkAPI();
  }, []);

  const title = {
    users: [
      { key: 'first_name', name: 'Vorname' },
      { key: 'last_name', name: 'Nachname' },
      { key: 'email', name: 'E-Mail' }
    ],
    bookings: [
      { key: 'user_id', name: 'Nutzer' },
      { key: 'parking_lot_id', name: 'Parkplatz' },
      { key: 'booking_date', name: 'Datum' },
      { key: 'booking_start_time', name: 'Startzeit' },
      { key: 'booking_end_time', name: 'Endzeit' }
    ]
  };

  // Zustand, um den aktuell ausgewählten Titel zu speichern
  const [selectedData, setSelectedData] = useState(user);

  const titles = [
    { key: 'users', name: 'Nutzer', data: user },
    { key: 'bookings', name: 'Buchungen', data: booking }
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
          {error && <Error>Keine Daten vorhanden</Error>}
        </Container>
      </MainContainer>
    </>
  );
};

export default Admin;