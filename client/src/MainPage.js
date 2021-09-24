import React, { useContext } from "react";
import { Grid, Paper } from "@material-ui/core";
import RecordItem from "./components/RecordItem";
import InfoModal from "./components/InfoModal";
import MainContext from "./contexts/main-context";

const MainPage = () => {
  const { data, setData } = useContext(MainContext);

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {data.records.length &&
          data.records.map((item) => <RecordItem record={item} />)}
      </Grid>
      <InfoModal />
    </div>
  );
};

export default MainPage;
