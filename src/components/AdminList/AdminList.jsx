import React, { useEffect, useState } from 'react';
import { Container, Error, HeaderContainer, MainContainer, PageButton, PaginationContainer, Title } from './AdminList.styled';
import axios from 'axios';
import ListComp from '../ListComp/ListComp';

const AdminList = () => {
  const [user, setUser] = useState([]);
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Paging States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Anzahl der Elemente pro Seite

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
          setUser(responseUser.data.users);                 // 'users' korrekt setzen
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

  // Funktion zum Hinzufügen eines neuen Nutzers
  const handleAdd = async (newUser) => {
    const token = localStorage.getItem('access_token');
    try {
      // POST-Anfrage an die API senden
      const response = await axios.post('https://parking.enten.dev/api/admin/user', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      // Erfolgreich erstellt: Nachricht anzeigen und die lokalen Daten aktualisieren
      if (response.status === 201) {
        console.log('User successfully created:', response.data);

        // Füge den neuen Benutzer zu den lokalen Daten hinzu
        setSelectedData([...selectedData, response.data.user]);
      }
    } catch (error) {
      console.error('User creation failed:', error.response?.data || error.message);
    }
  };

  const handleTitleClick = (title) => {
    setSelectedData(title.data);  // Ändere die angezeigten Daten basierend auf dem Titel
    setSelectedTitle(title.key);  // Setze den ausgewählten Titel
    setCurrentPage(1);            // Setze die aktuelle Seite zurück
  };

  // Bearbeiten-Funktion (mit API-Aufruf)
  const handleEdit = async (index, newData) => {
    const token = localStorage.getItem('access_token');
    const userId = selectedData[index].id;  // Annahme: 'id' ist der Schlüssel für die User-ID

    try {
      // PUT-Anfrage an die API senden
      const response = await axios.put(`https://parking.enten.dev/api/admin/user/${userId}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      // Erfolgreich bearbeitet: Nachricht anzeigen und die lokale Daten aktualisieren
      if (response.status === 200) {
        console.log('User successfully updated:', response.data);

        // Aktualisiere den Benutzer in der lokalen Datenquelle
        const updatedData = [...selectedData];
        updatedData[index] = response.data; // Aktualisiere die Daten mit der Antwort von der API
        setSelectedData(updatedData);
      }
    } catch (error) {
      console.error('User update failed:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (index) => {
    const token = localStorage.getItem('access_token');
    const userId = selectedData[index].id;  // Annahme: 'id' ist der Schlüssel für die User-ID

    try {
      // DELETE-Anfrage an die API senden
      const response = await axios.delete(`https://parking.enten.dev/api/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      // Erfolgreich gelöscht: Nachricht anzeigen und die lokale Daten aktualisieren
      if (response.status === 200) {
        console.log('User successfully deleted:', response.data.message);

        // Entferne den Benutzer aus der lokalen Datenquelle
        const updatedData = [...selectedData];
        updatedData.splice(index, 1); // Entfernt die Zeile an der Stelle `index`
        setSelectedData(updatedData);
      }
    } catch (error) {
      console.error('Deletion of user failed:', error.response?.data || error.message);
    }
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
            onAdd={handleAdd}  // Hinzufügen eines neuen Benutzers
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

export default AdminList;
