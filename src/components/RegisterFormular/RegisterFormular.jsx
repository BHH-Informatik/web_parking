import React, {useState} from 'react'
import { Container, Headline, Formular, Label, Input, Button, Text, LinkText } from './RegisterFormular.styled'
import axios from 'axios';

const RegisterFormular = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://parking.enten.dev/api/auth/register', {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.passwordConfirmation
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            setSuccessMessage('Erfolgreich registriert! Du kannst dich jetzt einloggen.');
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage('Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben.');
            setSuccessMessage(null);
        }
    };
    return (
        <>
            <Container>
                <Headline>Bitte registriere dich ein, um einen Parkplatz zu buchen.</Headline>
                <Formular onSubmit={handleSubmit}>
                    <Label>Vorname</Label>
                    <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required />

                    <Label>Nachname</Label>
                    <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required />

                    <Label>E-Mail</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required />

                    <Label>Passwort</Label>
                    <Input name="password" type="password" value={formData.password} onChange={handleInputChange} required />

                    <Label>Passwort wiederholen</Label>
                    <Input name="passwordConfirmation" type="password" value={formData.passwordConfirmation} onChange={handleInputChange} required />

                    <Button type="submit">Registrieren</Button>
                </Formular>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <Text>
                    Du hast schon einen Account? <LinkText href="/login">Dann logge dich hier ein.</LinkText>
                </Text>
            </Container>
        </>
    )
}

export default RegisterFormular