import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserContext = createContext(null);
export const UserContextProvider = props => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const setUserContext = async () => {
    return await axios
      .get('/api/auth/check')
      .then(res => {
        setUser(res.data.currentPlayer);
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        setError(err.response.data);
      });
  };

  const registerUser = async data => {
    const { username, fullname, password, passwordCheck } = data;

    return axios
      .post('/api/auth/register', {
        username,
        fullname,
        password,
        passwordCheck,
      })
      .then(async () => {
        await setUserContext();
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        setError(err.response.data);
      });
  };

  const loginUser = async data => {
    const { username, password } = data;
    return axios
      .post('/api/auth/login', {
        username,
        password,
      })
      .then(async () => {
        await setUserContext();
      })
      .catch(err => {
        setError(err.response.data);
      });
  };

  const clearError = () => {
    setError(null);
  };

  const ctxValue = { user, registerUser, loginUser, error, clearError };

  return (
    <UserContext.Provider value={ctxValue}>
      {props.children}
    </UserContext.Provider>
  );
};
