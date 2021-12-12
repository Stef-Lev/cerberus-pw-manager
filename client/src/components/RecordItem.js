import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MainContext from "../contexts/main-context";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { deleteMethod } from "../helpers/services";

const RecordItem = ({ record }) => {
  const { data, setData } = useContext(MainContext);
  const [openBar, setOpenBar] = useState(false);

  const handleItemClick = () => {
    setData({
      ...data,
      infoOpen: true,
      infoData: record,
      currentItemID: record.id,
    });
  };

  const handleDeleteClick = () => {
    setOpenBar(true);
  };

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar(false);
  };

  const handleItemDelete = (id) => {
    deleteMethod("/api/passwords/delete/", id)
      .then((response) => {
        setData({
          ...data,
          editMode: false,
          showPassword: false,
          infoOpen: false,
          currentItemID: null,
          genericOpen: true,
          genericMsg: response.message,
        });
      })
      .catch((err) =>
        setData({
          ...data,
          editMode: false,
          showPassword: false,
          infoOpen: false,
          currentItemID: null,
          genericOpen: true,
          genericMsg: err.result,
        })
      );
  };

  const action = (
    <>
      <Button
        color="error"
        size="large"
        onClick={() => handleItemDelete(record.id)}
      >
        DELETE
      </Button>
      <IconButton
        size="large"
        aria-label="close"
        color="inherit"
        onClick={handleCloseBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

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
                    // handleItemDelete(record.id);
                    handleDeleteClick();
                  }}
                />
              </div>
            </Paper>
          </Grid>
          <Snackbar
            sx={{
              "&.MuiSnackbar-root .MuiPaper-root": {
                background: "white",
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "black",
                height: "82px",
                border: "2px solid #222222",
                borderRadius: "12px",
              },
            }}
            open={openBar}
            onClose={handleCloseBar}
            message="Are you sure?"
            action={action}
          />
        </div>
      )}
    </>
  );
};

export default RecordItem;
