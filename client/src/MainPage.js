import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import RecordItem from "./components/RecordItem";
import InfoModal from "./components/InfoModal";
import MainContext from "./contexts/main-context";
import AddButton from "./components/AddButton";

const MainPage = () => {
  const { data, setData } = useContext(MainContext);

  const addRecord = () => {
    setData({ ...data, modalOpen: true, editMode: true, modalData: {} });
  };

  return (
    <div>
      <header>
        <h1>Password Lock</h1>
      </header>
      <section className="container">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {data.records.length &&
            data.records.map((item, index) => (
              <RecordItem record={item} key={`item_${index}`} />
            ))}
        </Grid>
        <InfoModal />
      </section>
      <AddButton clickAction={addRecord} />
    </div>
  );
};

export default MainPage;
