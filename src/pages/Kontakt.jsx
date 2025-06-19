import React from 'react'
import { Navbar, Kontaktformular } from '../components'
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
`

const Parkplatz = () => {
  return (
    <>
      <FlexContainer>
        <Kontaktformular/>
      </FlexContainer>
    </>
  )
}

export default Parkplatz