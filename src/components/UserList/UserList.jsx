import React from 'react';
import { Container, ListItemsContainer, MainContainer, Title, TitleContainer, UserRow, UserCell } from './UserList.styled';

const UserList = () => {
    const users = [
        { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
        { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
        { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
        { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
        { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
        { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
        { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
        { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
    ];

    return (
        <MainContainer>
            <Container>
                <TitleContainer>
                    <Title>Name</Title>
                    <Title>E-Mail</Title>
                    <Title>Gruppe</Title>
                </TitleContainer>
                <ListItemsContainer>
                    {users.map((user, index) => (
                        <UserRow key={index}>
                            <UserCell>{user.name}</UserCell>
                            <UserCell>{user.email}</UserCell>
                            <UserCell>{user.group}</UserCell>
                        </UserRow>
                    ))}
                </ListItemsContainer>
            </Container>
        </MainContainer>
    );
}

export default UserList;
