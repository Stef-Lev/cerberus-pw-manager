import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MainContext from "../contexts/main-context";

const RecordItem = ({ record }) => {
  const { data, setData } = useContext(MainContext);

  const handleItemClick = () => {
    setData({ ...data, infoOpen: true, infoData: record });
  };

  return (
    <>
      {record && (
        <div className="password-panel">
          <Grid item xs={12} sm={8} md={6}>
            <Paper elevation={3} onClick={handleItemClick}>
              <div className="panel-content">
                <p className="password-panel__title">{record.title}</p>
                <DeleteForeverIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("clicked: DELETE", record);
                  }}
                />
              </div>
            </Paper>
          </Grid>
        </div>
      )}
    </>
  );
};

export default RecordItem;
