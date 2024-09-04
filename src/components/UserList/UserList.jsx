import React, {} from 'react';
import { Container, ListItemsContainer, MainContainer, Title, TitleContainer } from './UserList.sytled';

const UserList = () => {
    return (
        <>
        <MainContainer>
        <Container>
            <TitleContainer>
                <Title>Name</Title>
                <Title>E-Mail</Title>
                <Title>Gruppe</Title>
            </TitleContainer>
            <ListItemsContainer>

            </ListItemsContainer>
            
        </Container>
        </MainContainer>

        </>
    );
}

export default UserList;
