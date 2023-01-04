import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { UserContextProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import './globalStyle.css';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './helpers/ScrollToTop';
import BottomNav from './components/BottomNav';
import useFindUser from './hooks/useFindUser';
import theme from './theme';
import ProtectedRoute from './pages/ProtectedRoute';
import GoHomeRoute from './pages/GoHomeRoute';
import Auth from './pages/Auth';
import Home from './pages/Home';
import RecordEdit from './pages/RecordEdit';
import RecordShow from './pages/RecordShow';
import RecordNew from './pages/RecordNew';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';

function App() {
  const { user, setUser, isLoading } = useFindUser();
  console.log(user);

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="3xl" height="100vh" mb="90px">
        <Router>
          <ScrollToTop />
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
              <Route
                exact
                path="/auth/:authPage"
                element={
                  <GoHomeRoute>
                    <Auth />
                  </GoHomeRoute>
                }
              />
              <Route
                exact
                path="/record/new"
                element={
                  <ProtectedRoute>
                    <RecordNew />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/record/:recordId"
                element={
                  <ProtectedRoute>
                    <RecordShow />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/record/:recordId/edit"
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
              <Route exact path="*" element={<Error404 />} />
            </Routes>
            {/* {user ? <BottomNav /> : null} */}
            <BottomNav />
          </UserContextProvider>
        </Router>
      </Container>
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
