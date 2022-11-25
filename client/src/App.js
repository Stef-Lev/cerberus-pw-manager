import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import RecordEdit from './pages/RecordEdit';
import RecordShow from './pages/RecordShow';
import Profile from './pages/Profile';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Router>
          <Routes>
            <Route path="/:recordId" element={<RecordShow />} />
            <Route path="/:recordId/edit" element={<RecordEdit />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
