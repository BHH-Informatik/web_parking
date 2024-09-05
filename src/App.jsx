import { Navbar, ParkplaetzeOverview } from "./components"
import GlobalStyles from './globalStyles';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
`;

function App() {

  return (
    <>
      <GlobalStyles/>
      <AppContainer>
        <Navbar />
        <ParkplaetzeOverview />
      </AppContainer>
    </>
  )
}

export default App
