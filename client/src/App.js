import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import theme from './theme';
import Login from './pages/Login';
import Home from './pages/Home';
import RecordEdit from './pages/RecordEdit';
import RecordShow from './pages/RecordShow';
import Profile from './pages/Profile';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="3xl">
        <Router>
          <Routes>
            <Route path="/:recordId" element={<RecordShow />} />
            <Route path="/:recordId/edit" element={<RecordEdit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Container>
    </ChakraProvider>
  );
}

export default App;
