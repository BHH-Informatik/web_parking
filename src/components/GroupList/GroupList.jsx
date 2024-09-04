import React from 'react';
import { Container, ListItemsContainer, MainContainer, Title, TitleContainer, Row, Cell } from './GroupList.styled';

const UserList = () => {
    const users = [
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
                        <Row key={index}>
                            <Cell> {user.name} </Cell>
                            <Cell> {user.email} </Cell>
                            <Cell> {user.group} </Cell>
                        </Row>
                    ))}
                </ListItemsContainer>
            </Container>
        </MainContainer>
    );
}

export default UserList;
