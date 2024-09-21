import React, { useEffect, useState } from 'react';
import { Container, Error, MainContainer, PageButton, PaginationContainer } from './AdminBooking.styled';
import axios from 'axios';
import ListComp from '../ListComp/ListComp';

const AdminBooking = () => {
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get('https://parking.enten.dev/api/admin/bookings', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
          setBooking(response.data.bookings);
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

    fetchBookings();
  }, []);

  const title = {
    bookings: [
      { key: 'user_id', name: 'Nutzer' },
      { key: 'parking_lot_id', name: 'Parkplatz' },
      { key: 'booking_date', name: 'Datum' },
      { key: 'booking_start_time', name: 'Startzeit' },
      { key: 'booking_end_time', name: 'Endzeit' },
    ],
  };

  const handleDelete = async (index) => {
    const token = localStorage.getItem('access_token');
    const bookingId = booking[index].id; // Annahme: 'id' ist der Schlüssel für die Buchung-ID

    try {
      const response = await axios.delete(`https://parking.enten.dev/api/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Booking successfully deleted:', response.data.message);

        // Entferne die Buchung aus den lokalen Daten
        const updatedData = [...booking];
        updatedData.splice(index, 1);
        setBooking(updatedData);
      }
    } catch (error) {
      console.error('Booking deletion failed:', error.response?.data || error.message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = booking.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(booking.length / itemsPerPage);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <MainContainer>
        <Container>
          <ListComp
            data={currentItems}
            title={title.bookings}
            onEdit={() => {}}
            onDelete={handleDelete}  // Delete-Funktion hier übergeben
            onAdd={() => {}}
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

export default AdminBooking;
