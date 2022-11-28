import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { UserContextProvider } from './context/UserContext';
import theme from './theme';
import Auth from './pages/Auth';
import Home from './pages/Home';
import RecordEdit from './pages/RecordEdit';
import RecordShow from './pages/RecordShow';
import Profile from './pages/Profile';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="3xl">
        <Router>
          <UserContextProvider>
            <Routes>
              <Route path="/:recordId" element={<RecordShow />} />
              <Route path="/:recordId/edit" element={<RecordEdit />} />
              <Route path="/auth/:authPage" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </UserContextProvider>
        </Router>
      </Container>
    </ChakraProvider>
  );
}

export default App;
