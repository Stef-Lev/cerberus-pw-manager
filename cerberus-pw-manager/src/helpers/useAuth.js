import { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function useAuth() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const setUserContext = async () => {
    return await axios
      .get("/api/auth/check")
      .then((res) => {
        setUser(res.data.currentUser);
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data);
      });
  };

  const registerUser = async (body) => {
    const { username, fullname, password, passwordCheck } = body;

    return axios
      .post("/api/auth/register", {
        username,
        fullname,
        password,
        passwordCheck,
      })
      .then(async () => {
        await setUserContext();
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data);
      });
  };

  const loginUser = async (body) => {
    const { username, password } = body;
    return axios
      .post("/api/auth/login", {
        username,
        password,
      })
      .then(async () => {
        await setUserContext();
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const logoutUser = async () => {
    try {
      await axios({
        method: "GET",
        url: "/api/auth/logout",
      }).then(() => {
        setUser(null);
        router.push("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    clearError,
    error,
  };
}
