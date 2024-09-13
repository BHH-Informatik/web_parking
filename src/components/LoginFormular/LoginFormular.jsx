import React, { useState, useContext } from 'react';
import { Container, Headline, Formular, Label, Input, Button, Text, LinkText } from './LoginFormular.styled';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LoginFormular = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        try {
            const isLoggedIn = await login(email, password);

            if (isLoggedIn) {
                setErrorMessage(null);
                navigate('/');
            } else {
                setErrorMessage('Login fehlgeschlagen. Bitte überprüfe deine Eingaben.');
            }
        } catch (error) {
            setErrorMessage('Login fehlgeschlagen. Bitte überprüfe deine Eingaben.');
        }
    };

    return (
        <Container>
            <Headline>Bitte logge dich ein, um einen Parkplatz zu buchen.</Headline>
            <Formular onSubmit={handleSubmit}>
                <Label>E-Mail</Label>
                <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required />

                <Label>Passwort</Label>
                <Input name="password" type="password" value={formData.password} onChange={handleInputChange} required />

                <Button type="submit">Einloggen</Button>
            </Formular>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <Text>
                Du bist noch nicht registriert? <LinkText href="/register">Dann registriere dich hier.</LinkText>
            </Text>
        </Container>
    );
};

export default LoginFormular;
