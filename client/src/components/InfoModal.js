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
import { useFormik } from "formik";
import { validationSchema } from "../helpers/validationSchema";

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
    "&:focus-visible": {
      outline: "none",
    },
  },
  formItem: {
    marginBottom: "16px",
  },
}));

export default function InfoModal() {
  const classes = useStyles();
  const { data, setData } = useContext(MainContext);

  const formik = useFormik({
    initialValues: {
      title: data.infoData?.title,
      username: data.infoData?.username,
      password: data.infoData?.password,
      url: data.infoData?.url,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleClose = () => {
    setData({
      ...data,
      editMode: false,
      showPassword: false,
      infoOpen: false,
    });
  };
  console.log("MODAL", data.infoData);

  const submitForm = () => {
    return;
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={data.infoOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={data.infoOpen}>
          <div className={classes.paper}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                className={classes.formItem}
                label="Title"
                value={formik.values.title}
                variant="standard"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: !data.editMode,
                  disableUnderline: !data.editMode,
                }}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                className={classes.formItem}
                label="Username"
                value={formik.values.username}
                variant="standard"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: !data.editMode,
                  disableUnderline: !data.editMode,
                  endAdornment: !data.editMode ? (
                    <InputAdornment position="end">
                      <ContentCopyIcon
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigator.clipboard.writeText(data.infoData.username)
                        }
                      />
                    </InputAdornment>
                  ) : null,
                }}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                className={classes.formItem}
                label="Password"
                type={data.showPassword || data.editMode ? "text" : "password"}
                value={formik.values.password}
                variant="standard"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: !data.editMode,
                  disableUnderline: !data.editMode,
                  endAdornment: !data.editMode ? (
                    <InputAdornment position="end">
                      <>
                        <VisibilityIcon
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={() => {
                            setData({
                              ...data,
                              showPassword: !data.showPassword,
                            });
                          }}
                        />
                        <ContentCopyIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigator.clipboard.writeText(
                              data.infoData.password
                            )
                          }
                        />
                      </>
                    </InputAdornment>
                  ) : null,
                }}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                className={classes.formItem}
                label="Website address"
                value={formik.values.url}
                variant="standard"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: !data.editMode,
                  disableUnderline: !data.editMode,
                  endAdornment: !data.editMode ? (
                    <InputAdornment position="end">
                      <ContentCopyIcon
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigator.clipboard.writeText(data.infoData.url)
                        }
                      />
                    </InputAdornment>
                  ) : null,
                }}
                onChange={formik.handleChange}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
              />
              {!data.editMode && (
                <Button
                  variant="contained"
                  id="edit-btn"
                  onClick={() =>
                    setData({
                      ...data,
                      editMode: true,
                    })
                  }
                >
                  Edit
                </Button>
              )}
              {data.editMode && (
                <Button
                  variant="contained"
                  id="submit-btn"
                  onClick={() =>
                    setData({
                      ...data,
                      editMode: false,
                    })
                  }
                >
                  Submit
                </Button>
              )}
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
