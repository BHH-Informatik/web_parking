import styled from 'styled-components';

export const Container = styled.div`
    width: 50vw;
    padding: 3% 3% 0 3%;
`

export const Headline = styled.p`
    font-size: 2rem;
`

export const Formular = styled.form`
    display: flex;
    flex-direction: column;
`

export const Label = styled.label`
    margin: 3% 0 3% 0;
`

export const Input = styled.input`
    border: none;
    background-color: #0393a319;
    padding: 2%;
    border-radius: 7px;
`

export const Button = styled.button`
    border: none;
    background-color: #FC6D5C;
    color: white;
    width: 25%;
    border-radius: 7px;
    margin: 3% 0 0 0;
    padding: 1%;
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.25);
`

export const Text = styled.p`
    margin-top: 20px;
    font-size: 1rem;
`;

export const LinkText = styled.a`
    color: #0393a3;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;