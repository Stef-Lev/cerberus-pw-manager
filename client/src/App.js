import "./App.scss";
import MainPage from "./routes/MainPage";
import MainContextProvider from "./contexts/MainContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Refactor scroll to top

const App = () => {
  return (
    <div className="App">
      <MainContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            {/* <Route path="/home" element={<MainPage />}></Route>
            <Route path="/home" element={<MainPage />}></Route> */}
          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
};

export default App;
