import React, { useState } from 'react';
import { Container, ListItemsContainer, Title, TitleContainer, Cell, Row, Button, Input, ErrorTooltip } from './ListComp.styled';

const ListComp = ({ title, data, onEdit, onDelete, onAdd, type }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [newData, setNewData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [editableRow, setEditableRow] = useState({});
  const [errors, setErrors] = useState({}); // Speichert die Fehlermeldungen

  // Validierungsfunktion für das Passwort
  const validatePassword = (password) => password.length >= 8;

  // Validierungsfunktion für die E-Mail
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Überprüfen, ob alle Felder korrekt ausgefüllt sind
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!newData.first_name) {
      formIsValid = false;
      newErrors.first_name = 'Vorname ist erforderlich';
    }
    if (!newData.last_name) {
      formIsValid = false;
      newErrors.last_name = 'Nachname ist erforderlich';
    }
    if (!newData.email) {
      formIsValid = false;
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!validateEmail(newData.email)) {
      formIsValid = false;
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }
    if (!newData.password) {
      formIsValid = false;
      newErrors.password = 'Passwort ist erforderlich';
    } else if (!validatePassword(newData.password)) {
      formIsValid = false;
      newErrors.password = 'Das Passwort muss mindestens 8 Zeichen lang sein';
    }
    if (newData.password !== newData.password_confirmation) {
      formIsValid = false;
      newErrors.password_confirmation = 'Passwörter stimmen nicht überein';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleAddClick = () => {
    if (validateForm()) {
      onAdd(newData);
      setNewData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
      });
      setErrors({});
    }
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
                    onChange={(e) => setEditableRow({ ...editableRow, [col.key]: e.target.value })}
                  />
                ) : (
                  row[col.key] + ""
                )}
              </Cell>
            ))}
            <Cell>
              {type === 'user' && (
                editIndex === index ? (
                  <Button onClick={() => onEdit(index, editableRow)}>Speichern</Button>
                ) : (
                  <Button onClick={() => setEditIndex(index)}>Bearbeiten</Button>
                )
              )}
              <Button onClick={() => onDelete(index)}>Löschen</Button>
            </Cell>
          </Row>
        ))}
      </ListItemsContainer>

      {type === 'user' && (
        <>
          <Row>
            <Cell>
              <Input
                value={newData.first_name}
                onChange={(e) => setNewData({ ...newData, first_name: e.target.value })}
                placeholder="Vorname"
              />
              {errors.first_name && <ErrorTooltip>{errors.first_name}</ErrorTooltip>}
            </Cell>
            <Cell>
              <Input
                value={newData.last_name}
                onChange={(e) => setNewData({ ...newData, last_name: e.target.value })}
                placeholder="Nachname"
              />
              {errors.last_name && <ErrorTooltip>{errors.last_name}</ErrorTooltip>}
            </Cell>
            <Cell>
              <Input
                value={newData.email}
                onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                placeholder="E-Mail"
              />
              {errors.email && <ErrorTooltip>{errors.email}</ErrorTooltip>}
            </Cell>
            <Cell>
              <Input
                value={newData.password}
                type="password"
                onChange={(e) => setNewData({ ...newData, password: e.target.value })}
                placeholder="Passwort"
              />
              {errors.password && <ErrorTooltip>{errors.password}</ErrorTooltip>}
            </Cell>
            <Cell>
              <Input
                value={newData.password_confirmation}
                type="password"
                onChange={(e) => setNewData({ ...newData, password_confirmation: e.target.value })}
                placeholder="Passwort bestätigen"
              />
              {errors.password_confirmation && <ErrorTooltip>{errors.password_confirmation}</ErrorTooltip>}
            </Cell>
            <Cell>
              <Button onClick={handleAddClick}>Hinzufügen</Button>
            </Cell>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ListComp;
