import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [service, setService] = useState("");
  const [passwordsList, setPasswordsList] = useState([]);

  const addPassword = (params) => {
    Axios.post("http://localhost:5000/addpassword", { password, service });
  };

  const fetchPassword = (encryption) => {
    Axios.post("http://localhost:5000/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) =>
      setPasswordsList(
        passwordsList.map((item) =>
          item.id === encryption.id
            ? {
                id: item.id,
                password: item.password,
                service: response.data,
                iv: item.iv,
              }
            : item
        )
      )
    );
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/showpasswords").then((data) =>
      setPasswordsList(data.data)
    );
  }, []);

  console.log(passwordsList);

  return (
    <div className="App">
      <div className="adding-password">
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Application"
          onChange={(e) => setService(e.target.value)}
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
                  fetchPassword({
                    password: item.password,
                    iv: item.iv,
                    id: item.id,
                  })
                }
              >
                {item.service}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
