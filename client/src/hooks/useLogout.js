import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export default function useLogout() {
  const navigate = useNavigate();
  const { setPlayer } = useContext(UserContext);

  const logoutPlayer = async () => {
    try {
      await axios({
        method: 'GET',
        url: '/api/auth/logout',
      }).then(res => {
        setPlayer(null);
        navigate('/');
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    logoutPlayer,
  };
}
