import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import RecordItem from "./components/RecordItem";
import InfoModal from "./components/InfoModal";
import MainContext from "./contexts/main-context";

const MainPage = () => {
  const { data } = useContext(MainContext);

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
    </div>
  );
};

export default MainPage;
