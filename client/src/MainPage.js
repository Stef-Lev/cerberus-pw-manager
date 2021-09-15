import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import PasswordItem from "./components/PasswordItem";

const MainPage = () => {
  const [data, setData] = useState([]);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <PasswordItem
          record={{
            title: "Amazon",
            username: "sigianas@yahoo.com",
            url: "https://amazon.com",
            password: "307d61a8077f586547cb8911c482",
          }}
        />
        <PasswordItem />
      </Grid>
    </div>
  );
};

export default MainPage;
