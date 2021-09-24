import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MainContext from "../contexts/main-context";
import InputAdornment from "@material-ui/core/InputAdornment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "120px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 2),
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "66%",
    },
    [theme.breakpoints.up("md")]: {
      width: "550px",
    },
  },
  formItem: {
    marginBottom: "16px",
  },
}));

export default function InfoModal() {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data, setData } = useContext(MainContext);

  const handleClose = () => {
    setData({ ...data, modalOpen: false });
  };
  console.log("MODAL", data.modalData);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={data.modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={data.modalOpen}>
          <div className={classes.paper}>
            {!!Object.keys(data.modalData).length && (
              <form>
                <TextField
                  className={classes.formItem}
                  label="Title"
                  value={data.modalData.title}
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: !editMode,
                    disableUnderline: !editMode,
                    endAdornment: (
                      <InputAdornment position="end">
                        <ContentCopyIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigator.clipboard.writeText(data.modalData.title)
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.formItem}
                  label="Username"
                  value={data.modalData.username}
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: !editMode,
                    disableUnderline: !editMode,
                    endAdornment: (
                      <InputAdornment position="end">
                        <ContentCopyIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigator.clipboard.writeText(
                              data.modalData.username
                            )
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.formItem}
                  label="Password"
                  type={showPassword || editMode ? "text" : "password"}
                  value={data.modalData.password}
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: !editMode,
                    disableUnderline: !editMode,
                    endAdornment: (
                      <InputAdornment position="end">
                        <>
                          <VisibilityIcon
                            style={{ cursor: "pointer", marginRight: "10px" }}
                            onClick={() => {
                              setShowPassword((prev) => !prev);
                            }}
                          />
                          <ContentCopyIcon
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigator.clipboard.writeText(
                                data.modalData.password
                              )
                            }
                          />
                        </>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.formItem}
                  label="Website address"
                  value={data.modalData.url}
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: !editMode,
                    disableUnderline: !editMode,
                    endAdornment: (
                      <InputAdornment position="end">
                        <ContentCopyIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigator.clipboard.writeText(data.modalData.url)
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                {!editMode && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </Button>
                )}
                {editMode && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditMode(false)}
                  >
                    Submit
                  </Button>
                )}
              </form>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
