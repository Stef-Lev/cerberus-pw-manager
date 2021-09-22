import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const RecordItem = ({ record, clickAction }) => {
  return (
    <>
      {record && (
        <div className="password-panel">
          <Grid item xs={12} sm={8} md={6}>
            <Paper elevation={3} onClick={clickAction}>
              <>
                <h1>{record.title}</h1>
                <p>{record.username}</p>
              </>
            </Paper>
          </Grid>
        </div>
      )}
    </>
  );
};

export default RecordItem;
