import React, { useEffect, useState } from 'react';
import { ListComp } from '../components';
import styled from 'styled-components';
import axios from 'axios';

const MainContainer = styled.div`
    margin: 0 auto;
    width: 90%;
    display: flex;
    height: 90vh;
    align-items: center;
`;

const HeaderContainer = styled.div`
    margin: 0 auto;
    width: 90%;
    display: flex;
    align-items: start;
    height: 10vh;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
`;

const Error = styled.p``;

const Title = styled.div`
    color: #3D3D3D;
    line-height: 1.5;
    width: 30%;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:hover {
        font-size: 1.1em;
    }
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 5% 0;
    align-items: center;
`;

const PageButton = styled.button`
    margin: 0 3% 0 3%;
    padding: 10px 20px;
    background-color: #FC6D5C;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
        background-color: #aaa;
        cursor: not-allowed;
    }
`;

const Admin = () => {
  const [user, setUser] = useState([]);
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Paging States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Anzahl der Elemente pro Seite

  useEffect(() => {
    const checkAPI = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const responseUser = await axios.get('https://parking.enten.dev/api/admin/user', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
          const responseBooking = await axios.get('https://parking.enten.dev/api/admin/bookings', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
          console.log(responseUser.data);
          setUser(responseUser.data.users); // Stelle sicher, dass 'users' korrekt gesetzt wird
          setBooking(responseBooking.data.bookings || []); // Buchungen setzen oder leeres Array

          // Setze die User-Daten initial in selectedData
          setSelectedData(responseUser.data.users); // Initialisiert die User-Daten
          setLoading(false); // Ladezustand beenden
        } catch (error) {
          console.error('Token validation failed:', error);
          setError(true);
          setLoading(false); // Ladezustand beenden
        }
      } else {
        setError(true);
        setLoading(false); // Ladezustand beenden, wenn kein Token vorhanden ist
      }
    };

    checkAPI();
  }, []);

  const title = {
    users: [
      { key: 'first_name', name: 'Vorname' },
      { key: 'last_name', name: 'Nachname' },
      { key: 'email', name: 'E-Mail' },
    ],
    bookings: [
      { key: 'user_id', name: 'Nutzer' },
      { key: 'parking_lot_id', name: 'Parkplatz' },
      { key: 'booking_date', name: 'Datum' },
      { key: 'booking_start_time', name: 'Startzeit' },
      { key: 'booking_end_time', name: 'Endzeit' },
    ],
  };

  // Zustand, um den aktuell ausgewählten Titel zu speichern
  const [selectedData, setSelectedData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('users'); // Nutzer standardmäßig auswählen

  const titles = [
    { key: 'users', name: 'Nutzer', data: user },
    { key: 'bookings', name: 'Buchungen', data: booking },
  ];

  const handleTitleClick = (title) => {
    setSelectedData(title.data); // Ändere die angezeigten Daten basierend auf dem Titel
    setSelectedTitle(title.key); // Setze den ausgewählten Titel
    setCurrentPage(1); // Setze die aktuelle Seite zurück
  };

  // Berechne die Daten, die auf der aktuellen Seite angezeigt werden sollen
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = selectedData.slice(indexOfFirstItem, indexOfLastItem);

  // Berechne die Gesamtanzahl der Seiten
  const totalPages = Math.ceil(selectedData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Ladeanzeige, solange die Daten noch geladen werden
  if (loading) {
    return <p>Loading...</p>;
  }

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
          <ListComp data={currentItems} title={title[selectedTitle]} />
          {error && <Error>Keine Daten vorhanden</Error>}

          {/* Paginierung */}
          <PaginationContainer>
            <PageButton onClick={prevPage} disabled={currentPage === 1}>
              Zurück
            </PageButton>
            <span>Seite {currentPage} von {totalPages}</span>
            <PageButton onClick={nextPage} disabled={currentPage === totalPages}>
              Weiter
            </PageButton>
          </PaginationContainer>
        </Container>
      </MainContainer>
    </>
  );
};

export default Admin;
