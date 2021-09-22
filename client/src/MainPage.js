import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import RecordItem from "./components/RecordItem";

const MainPage = () => {
  const [data, setData] = useState([]);
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <RecordItem
          record={{
            title: "Amazon",
            username: "sigianas@yahoo.com",
            url: "https://amazon.com",
            password: "307d61a8077f586547cb8911c482",
          }}
        />
        <RecordItem />
        <RecordItem
          record={{
            title: "Amazon",
            username: "sigianas@yahoo.com",
            url: "https://amazon.com",
            password: "307d61a8077f586547cb8911c482",
          }}
          clickAction={() => console.log("clicked")}
        />
        <RecordItem />
      </Grid>
    </div>
  );
};

export default MainPage;
