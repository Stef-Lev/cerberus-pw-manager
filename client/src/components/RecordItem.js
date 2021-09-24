import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MainContext from "../contexts/main-context";

const RecordItem = ({ record }) => {
  const { data, setData } = useContext(MainContext);

  const handleItemClick = () => {
    setData({ ...data, modalOpen: true, modalData: record });
  };

  console.log(record);
  return (
    <>
      {record && (
        <div className="password-panel">
          <Grid item xs={12} sm={8} md={6}>
            <Paper elevation={3} onClick={handleItemClick}>
              <p className="password-panel__title">{record.title}</p>
            </Paper>
          </Grid>
        </div>
      )}
    </>
  );
};

export default RecordItem;
