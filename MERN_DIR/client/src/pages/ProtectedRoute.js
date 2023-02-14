import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function PrivateRoute({ children }) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return user ? children : <Navigate to="/auth/login/" />;
}
