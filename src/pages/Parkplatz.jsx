import React from 'react'
import { Navbar, ParkplaetzeOverview } from '../components'
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
`

const Parkplatz = () => {
  return (
    <>
      <FlexContainer>
        <Navbar/>
        <ParkplaetzeOverview/>
      </FlexContainer>
    </>
  )
}

export default Parkplatz