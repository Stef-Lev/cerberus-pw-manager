import "./App.scss";
// import OldVersion from "./OldVersion";
import MainPage from "./MainPage";
import MainContextProvider from "./contexts/MainContextProvider";
import { StylesProvider } from "@mui/styles";
//Refactor scroll to top

const App = () => {
  return (
    <StylesProvider injectFirst>
      <div className="App">
        <MainContextProvider>
          <MainPage />
        </MainContextProvider>
      </div>
    </StylesProvider>
  );
};

export default App;
