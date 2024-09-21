import React, { useEffect, useState } from 'react';
import { Container, Error, HeaderContainer, MainContainer, PageButton, PaginationContainer, Title } from './AdminUser.styled';
import axios from 'axios';
import ListComp from '../ListComp/ListComp';

const AdminUser = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Paging States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Anzahl der Elemente pro Seite

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get('https://parking.enten.dev/api/admin/user', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
          setUser(response.data.users); // Nutzer setzen
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

    fetchUsers();
  }, []);

  const title = {
    users: [
      { key: 'first_name', name: 'Vorname' },
      { key: 'last_name', name: 'Nachname' },
      { key: 'email', name: 'E-Mail' },
    ],
  };

  const handleAdd = async (newUser) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.post('https://parking.enten.dev/api/admin/user', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status === 201) {
        setUser([...user, response.data.user]);
      }
    } catch (error) {
      console.error('User creation failed:', error.response?.data || error.message);
    }
  };

  const handleEdit = async (index, newData) => {
    const token = localStorage.getItem('access_token');
    const userId = user[index].id; // Annahme: 'id' ist der Schlüssel für die User-ID

    try {
      const response = await axios.put(`https://parking.enten.dev/api/admin/user/${userId}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        const updatedData = [...user];
        updatedData[index] = response.data; // Aktualisiere die Daten
        setUser(updatedData);
      }
    } catch (error) {
      console.error('User update failed:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (index) => {
    const token = localStorage.getItem('access_token');
    const userId = user[index].id;

    try {
      const response = await axios.delete(`https://parking.enten.dev/api/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        const updatedData = [...user];
        updatedData.splice(index, 1);
        setUser(updatedData);
      }
    } catch (error) {
      console.error('User deletion failed:', error.response?.data || error.message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = user.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(user.length / itemsPerPage);

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
            title={title.users}
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

export default AdminUser;
