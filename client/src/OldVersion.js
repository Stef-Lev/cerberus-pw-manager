import "./App.scss";
import { useState, useEffect } from "react";
import Axios from "axios";

function OldVersion() {
  const [pwState, setPwState] = useState({
    title: "",
    login: "",
    password: "",
    url: "",
    notes: "",
  });
  const [passwordsList, setPasswordsList] = useState([]);

  const addPassword = () => {
    Axios.post("http://localhost:5000/passwords/add", pwState);
  };

  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:5000/passwords/decrypt", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) =>
      setPasswordsList(
        passwordsList.map((item) =>
          item.id === encryption.id
            ? {
                id: item.id,
                password: item.password,
                title: response.data,
                iv: item.iv,
              }
            : item
        )
      )
    );
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/passwords/get").then((data) =>
      setPasswordsList(data.data)
    );
  }, []);

  return (
    <>
      <div className="adding-password">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) =>
            setPwState((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="Login"
          onChange={(e) =>
            setPwState((prevState) => ({
              ...prevState,
              login: e.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) =>
            setPwState((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="URL"
          onChange={(e) =>
            setPwState((prevState) => ({
              ...prevState,
              url: e.target.value,
            }))
          }
        />
        <textarea
          rows="4"
          cols="22"
          placeholder="Notes"
          onChange={(e) =>
            setPwState((prevState) => ({
              ...prevState,
              notes: e.target.value,
            }))
          }
        />
        <button onClick={addPassword}>Add password</button>
      </div>

      <div className="password-list">
        {passwordsList.length &&
          passwordsList.map((item, key) => (
            <div>
              <h2
                className="password-item"
                key={key}
                onClick={() =>
                  decryptPassword({
                    password: item.password,
                    iv: item.iv,
                    id: item.id,
                  })
                }
              >
                {item.title}
              </h2>
            </div>
          ))}
      </div>
    </>
  );
}

export default OldVersion;
