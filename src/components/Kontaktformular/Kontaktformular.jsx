import React, { useState } from 'react';
import axios from 'axios';
import { Container, Headline, Formular, Label, Input, Textarea, Button } from './Kontaktformular.styled';

const Kontaktformular = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        'https://parking.enten.dev/api/message/send',
        {
          subject,
          message,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      setSuccess('Nachricht erfolgreich gesendet!');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
      setError('Fehler beim Senden der Nachricht. Bitte versuche es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Headline>Du benötigst Hilfe oder möchtest ein Problem melden?</Headline>
      <Formular onSubmit={handleSubmit}>
        <Label>Betreff</Label>
        <Input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <Label>Nachricht</Label>
        <Textarea
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Absenden...' : 'Absenden'}
        </Button>
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </Formular>
    </Container>
  );
};

export default Kontaktformular;
