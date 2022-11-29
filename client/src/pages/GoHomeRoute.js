import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function RedirectLoggedIn({ children }) {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log('USER', user);
  //   if (user) {
  //     navigate('/');
  //     return;
  //   }
  return children;
}
