import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './globalStyles';
import Parkplatz from './pages/Parkplatz';
import Admin from './pages/Admin';

const AppContainer = styled.div`
  display: flex;
`;

function App() {

  return (
    <>
    <Router> 
      <GlobalStyles/>
      <Routes>
        <Route exact path="/" element={<Parkplatz/>} />
        <Route exact path="/admin" element={<Admin/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
