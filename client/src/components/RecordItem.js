import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MainContext from "../contexts/main-context";
import { deleteMethod } from "../helpers/services";

const RecordItem = ({ record }) => {
  const { data, setData } = useContext(MainContext);

  const handleItemClick = () => {
    setData({
      ...data,
      infoOpen: true,
      infoData: record,
      currentItemID: record.id,
    });
  };

  const handleItemDelete = (id) => {
    deleteMethod("/passwords/delete/", id);
    window.location.reload(false);
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
                    handleItemDelete(record.id);
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
