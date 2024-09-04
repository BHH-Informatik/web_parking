import React from 'react'
import { Navbar, UserList } from '../components'
import { MainContainer } from '../components/UserList/UserList.styled'

const Admin = () => {
  return (
    <>
        <MainContainer>
          <UserList/>
        </MainContainer>
        <Navbar/>
    </>
  )
}

export default Admin