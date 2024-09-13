import React from 'react'
import { Container, Headline, Formular, Label, Input, Textarea, Button } from './Kontaktformular.styled'

const Kontaktformular = () => {
  return (
    <>
        <Container>
            <Headline>Du benötigst Hilfe oder möchtest ein Problem melden?</Headline>
            <Formular>
                <Label>Name</Label>
                <Input></Input>
                <Label>E-Mail</Label>
                <Input></Input>
                <Label>Nachricht</Label>
                <Textarea rows={6}></Textarea>
                <Button>Absenden</Button>
            </Formular>
        </Container>
    </>
  )
}

export default Kontaktformular