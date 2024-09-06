import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './globalStyles';
import Parkplatz from './pages/Parkplatz';
import Admin from './pages/Admin';
import { Navbar } from './components';
import styled from 'styled-components';

const PageContainer = styled.div`
    margin-left: 350px;
    display: flex;
    align-items: center;
    height: 100vh;
`;

function App() {

  return (
    <>
    <Navbar/>
    <PageContainer>
      <Router>
        <GlobalStyles/>
        <Routes>
          <Route exact path="/" element={<Parkplatz/>} />
          <Route exact path="/admin" element={<Admin/>} />
        </Routes>
      </Router>
    </PageContainer>
    </>
  )
}

export default App
