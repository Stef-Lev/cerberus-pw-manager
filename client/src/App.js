import "./App.scss";
import MainPage from "./routes/MainPage";
import Register from "./routes/Register";
import Login from "./routes/Login";
import MainContextProvider from "./contexts/MainContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div className="App">
      <MainContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
};

export default App;
