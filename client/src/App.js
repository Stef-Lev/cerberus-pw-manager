import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { UserContextProvider } from './context/UserContext';
import useFindUser from './hooks/useFindUser';
import theme from './theme';
import ProtectedRoute from './pages/ProtectedRoute';
import Auth from './pages/Auth';
import Home from './pages/Home';
import RecordEdit from './pages/RecordEdit';
import RecordShow from './pages/RecordShow';
import Profile from './pages/Profile';

function App() {
  const { user, setUser, isLoading } = useFindUser();

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="3xl">
        <Router>
          <UserContextProvider value={{ user, setUser, isLoading }}>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route exact path="/auth/:authPage" element={<Auth />} />
              <Route
                exact
                path="/:recordId"
                element={
                  <ProtectedRoute>
                    <RecordShow />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/:recordId/edit"
                element={
                  <ProtectedRoute>
                    <RecordEdit />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </UserContextProvider>
        </Router>
      </Container>
    </ChakraProvider>
  );
}

export default App;
