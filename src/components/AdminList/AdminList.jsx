import React, { useState } from 'react';
import { Container, HeaderContainer, MainContainer, Title } from './AdminList.styled';
import AdminUser from '../AdminUser/AdminUser';
import AdminBooking from '../AdminBooking/AdminBooking';

const AdminList = () => {
  const [selectedTitle, setSelectedTitle] = useState('users');

  const titles = [
    { key: 'users', name: 'Nutzer' },
    { key: 'bookings', name: 'Buchungen' },
  ];

  return (
    <>
      <MainContainer>
        <Container>
          <HeaderContainer>
            {titles.map((title) => (
              <Title key={title.key} onClick={() => setSelectedTitle(title.key)}>
                {title.name}
              </Title>
            ))}
          </HeaderContainer>
          {selectedTitle === 'users' && <AdminUser />}
          {selectedTitle === 'bookings' && <AdminBooking />}
        </Container>
      </MainContainer>
    </>
  );
};


export default AdminList;
