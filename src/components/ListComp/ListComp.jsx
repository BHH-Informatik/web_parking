import React, { useState } from 'react';
import { Container, ListItemsContainer, Title, TitleContainer, Cell, Row, Button, Input } from './ListComp.styled';

const ListComp = ({ title, data, onEdit, onDelete, onAdd }) => {
  const [editIndex, setEditIndex] = useState(null); // Zum Verfolgen, welche Zeile bearbeitet wird
  const [newData, setNewData] = useState({}); // Für das Hinzufügen neuer Daten
  const [editableRow, setEditableRow] = useState({}); // Für das Bearbeiten von Zeilen

  // Bearbeiten einer Zeile aktivieren
  const handleEditClick = (index, row) => {
    setEditIndex(index);
    setEditableRow({ ...row });
  };

  // Änderungen speichern
  const handleSaveClick = (index) => {
    onEdit(index, editableRow); // onEdit-Funktion aufrufen, um die Änderungen zu übergeben
    setEditIndex(null);
  };

  // Änderungen an der bearbeiteten Zeile verfolgen
  const handleChange = (e, key) => {
    setEditableRow({ ...editableRow, [key]: e.target.value });
  };

  // Änderungen für neue Daten verfolgen
  const handleNewDataChange = (e, key) => {
    setNewData({ ...newData, [key]: e.target.value });
  };

  // Neue Zeile hinzufügen
  const handleAddClick = () => {
    onAdd(newData); // onAdd-Funktion aufrufen, um neue Daten hinzuzufügen
    setNewData({});
  };

  return (
    <Container>
      <TitleContainer>
        {title && title.map((col) => (
          <Title key={col.key}>{col.name}</Title>
        ))}
        <Title>Aktionen</Title>
      </TitleContainer>

      <ListItemsContainer>
        {data.map((row, index) => (
          <Row key={index}>
            {title && title.map((col) => (
              <Cell key={col.key}>
                {editIndex === index ? (
                  <Input
                    value={editableRow[col.key]}
                    onChange={(e) => handleChange(e, col.key)}
                  />
                ) : (
                  row[col.key] + ""
                )}
              </Cell>
            ))}
            <Cell>
              {editIndex === index ? (
                <Button onClick={() => handleSaveClick(index)}>Speichern</Button>
              ) : (
                <Button onClick={() => handleEditClick(index, row)}>Bearbeiten</Button>
              )}
              <Button onClick={() => onDelete(index)}>Löschen</Button>
            </Cell>
          </Row>
        ))}
      </ListItemsContainer>

      {/* Hinzufügen eines neuen Eintrags */}
      <Row>
        {title && title.map((col) => (
          <Cell key={col.key}>
            <Input
              value={newData[col.key] || ""}
              onChange={(e) => handleNewDataChange(e, col.key)}
              placeholder={`Neuer ${col.name}`}
            />
          </Cell>
        ))}
        <Cell>
          <Button onClick={handleAddClick}>Hinzufügen</Button>
        </Cell>
      </Row>
    </Container>
  );
};

export default ListComp;
