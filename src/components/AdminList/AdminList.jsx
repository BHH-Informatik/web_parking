import React, { useEffect, useState } from 'react';
import { Container, Error, HeaderContainer, MainContainer, PageButton, PaginationContainer, Title } from './AdminList.styled';
import axios from 'axios';
import ListComp from '../ListComp/ListComp';

const AdminComp = () => {
  const [user, setUser] = useState([]);
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Paging States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Anzahl der Elemente pro Seite

  // Zustand, um den aktuell ausgewählten Titel zu speichern
  const [selectedData, setSelectedData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('users'); // Nutzer standardmäßig auswählen

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
          setUser(responseUser.data.users);                 // 'users' korrekt setzten
          setBooking(responseBooking.data.bookings || []);  // Buchungen setzen oder leeres Array
          setSelectedData(responseUser.data.users);         // Setze die User-Daten initial in selectedData
          setLoading(false);
        } catch (error) {
          console.error('Token validation failed:', error);
          setError(true);
          setLoading(false);
        }
      } else {
        setError(true);
        setLoading(false);
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

  const titles = [
    { key: 'users', name: 'Nutzer', data: user },
    { key: 'bookings', name: 'Buchungen', data: booking },
  ];

  // Bearbeiten-Funktion
  const handleEdit = (index, newData) => {
    const updatedData = [...selectedData];
    updatedData[index] = newData;
    setSelectedData(updatedData);

    // Falls du diese Daten auch im Backend speichern willst, kannst du hier einen PUT-Request hinzufügen
  };

  // Löschen-Funktion
  const handleDelete = (index) => {
    const updatedData = [...selectedData];
    updatedData.splice(index, 1); // Entfernt die Zeile an der Stelle `index`
    setSelectedData(updatedData);

    // Falls du diese Änderung im Backend speichern willst, kannst du hier einen DELETE-Request hinzufügen
  };

  // Hinzufügen-Funktion
  const handleAdd = (newData) => {
    setSelectedData([...selectedData, newData]);

    // Falls du diese Daten im Backend speichern willst, kannst du hier einen POST-Request hinzufügen
  };

  const handleTitleClick = (title) => {
    setSelectedData(title.data);  // Ändere die angezeigten Daten basierend auf dem Titel
    setSelectedTitle(title.key);  // Setze den ausgewählten Titel
    setCurrentPage(1);            // Setze die aktuelle Seite zurück
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
          <ListComp
            data={currentItems}
            title={title[selectedTitle]}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
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

export default AdminComp;
