import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GlobalStyles from './globalStyles';
import Parkplatz from './pages/Parkplatz';
import Admin from './pages/Admin';
import Kontakt from './pages/Kontakt';
import Login from './pages/Login';
import { Navbar } from './components';
import styled from 'styled-components';
import Register from './pages/Register';
import { AuthProvider, AuthContext } from './context/AuthContext';

const PageContainer = styled.div`
    margin-left: 350px;
    display: flex;
    align-items: center;
    height: 100vh;
`;

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Parkplatz /> : <Navigate to="/login" />} />
      <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
      <Route path="/kontakt" element={isAuthenticated ? <Kontakt /> : <Navigate to="/login" />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <AuthProvider>
      <Router>
        <GlobalStyles />
        {isAuthenticated && <Navbar />}
        <PageContainer>
          <AppRoutes />
        </PageContainer>
      </Router>
    </AuthProvider>
  );
}

export default App;