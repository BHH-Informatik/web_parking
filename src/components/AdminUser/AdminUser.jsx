import React, { useEffect, useState } from 'react';
import { Container, Error, MainContainer, PageButton, PaginationContainer } from './AdminUser.styled';
import axios from 'axios';
import ListComp from '../ListComp/ListComp';

const AdminUser = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

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
          setUser(response.data.users);
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

  const getRealIndex = (index) => {
    return index + (currentPage - 1) * itemsPerPage;
  };


  const handleAddUser = async (newUserData) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.post('https://parking.enten.dev/api/admin/user', newUserData, {
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

  const handleNewUserChange = (e, key) => {
    setNewUser({ ...newUser, [key]: e.target.value });
  };

  const handleDelete = async (index) => {
    const token = localStorage.getItem('access_token');
    const userId = user[getRealIndex(index)].id;

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
        updatedData.splice(getRealIndex(index), 1);
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
            title={[{ key: 'first_name', name: 'Vorname' }, { key: 'last_name', name: 'Nachname' }, { key: 'email', name: 'E-Mail' }]}
            onDelete={handleDelete}
            onAdd={handleAddUser}
            newEntry={newUser}
            onNewEntryChange={handleNewUserChange}
            type="user"
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
