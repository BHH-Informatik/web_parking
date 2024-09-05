import React from 'react'
import { Navbar, ListComp } from '../components'
import { MainContainer } from '../components/ListComp/ListComp.styled'

const Admin = () => {
  const data = [
    { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
    { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
    { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' },
    { name: 'Max Mustermann', email: 'max@mustermann.de', group: 'Gruppe 1' }
  ];

  const title = [
    { key: "name", name: 'Name'},
    { key: "email", name: 'E-Mail'},
    { key: "group", name: 'Gruppe'}
  ];

  return (
    <>
        <MainContainer>
          <ListComp title={title} data={data}/>
        </MainContainer>
        <Navbar/>
    </>
  )
}

export default Admin