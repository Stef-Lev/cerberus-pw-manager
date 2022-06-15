import React, { useContext } from "react";
import { Grid } from "@mui/material";
import RecordItem from "./components/RecordItem";
import Header from "./components/Header";
import InfoModal from "./components/InfoModal";
import GenericModal from "./components/GenericModal";
import MainContext from "./contexts/main-context";
import AddButton from "./components/AddButton";
import Loader from "./components/Loader";
import ScrollTopBtn from "./components/ScrollTopBtn";

const MainPage = () => {
  const { data, setData } = useContext(MainContext);

  const addRecord = () => {
    setData({
      ...data,
      infoOpen: true,
      editMode: true,
      infoData: {},
      currentItemID: null,
    });
  };

  return (
    <div>
      <Header />
      <section className="container">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {data.loading && <Loader />}
          {!data.loading &&
            data.records.map((item, index) => (
              <RecordItem record={item} key={`item_${index}`} />
            ))}
        </Grid>
        <InfoModal />
        <GenericModal />
        <ScrollTopBtn />
      </section>
      <AddButton clickAction={addRecord} />
    </div>
  );
};

export default MainPage;
