import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MainContext from "../contexts/main-context";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    textAlign: "center",
    transform: "translateY(100px)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 2, 4),
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "66%",
    },
    [theme.breakpoints.up("md")]: {
      width: "550px",
    },
    "&:focus-visible": {
      outline: "none",
    },
    animation: `$modalAnimation 500ms ${theme.transitions.easing.easeInOut}`,
  },
  modalMessage: {
    fontSize: "1.4rem",
    marginTop: "1rem",
  },
  "@keyframes modalAnimation": {
    "0%": {
      transform: "translateY(-200%)",
    },
    "100%": {
      transform: "translateY(100px)",
    },
  },
}));

export default function GenericModal() {
  const classes = useStyles();
  const { data, setData } = useContext(MainContext);

  const handleClose = () => {
    setData({
      ...data,
      genericMsg: "false",
      genericOpen: false,
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={data.genericOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={data.genericOpen}>
          <div className={classes.paper}>
            <NewReleasesIcon style={{ width: "50px", height: "50px" }} />
            <p className={classes.modalMessage}>{data.genericMsg}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
