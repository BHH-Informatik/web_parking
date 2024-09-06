import React from 'react';
import { Container, ListItemsContainer, MainContainer, Title, TitleContainer, Cell, Row } from './ListComp.styled';

const ListComp = ({
        title,
        data
    }) => {
        console.log(title, data);
    return (
        <MainContainer>
            <Container>
                <TitleContainer>
                    {title && title.map((col) => (
                        <Title key={col.key}> {col.name} </Title>
                    ))}
                </TitleContainer>
                <ListItemsContainer>
                    {data.map((row, index) => (
                        <Row key={index}>
                            {title && title.map((col) => (
                                 <Cell key={col.key}> {row[col.key]+""} </Cell>
                            ))}
                        </Row>
                    ))}
                </ListItemsContainer>
            </Container>
        </MainContainer>
    );
}

export default ListComp;
