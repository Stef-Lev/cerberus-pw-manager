import React, { useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import MainContext from "../contexts/main-context";
import InputAdornment from "@mui/material/InputAdornment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { validationSchema } from "../helpers/validationSchema";
import { postMethod, updateMethod } from "../helpers/services";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
`;

const ModalPaper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  text-align: center;
  padding: 20px;
  width: 90%;
  z-index: 1;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  animation: modalAnimation 350ms ease-in-out;
  @keyframes modalAnimation {
    0% {
      transform: translateY(-500px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  @media only screen and (min-width: 460px) {
    width: 400px;
  }
`;

export default function InfoModal() {
  const { data, setData } = useContext(MainContext);

  const formik = useFormik({
    initialValues: {
      title: data.infoData.title || "",
      username: data.infoData.username || "",
      password: data.infoData.password || "",
      url: data.infoData.url || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitFormValues(values);
    },
  });

  const handleClose = () => {
    setData({
      ...data,
      editMode: false,
      showPassword: false,
      infoOpen: false,
      infoData: {},
    });
    formik.resetForm({ values: "" });
  };

  const submitFormValues = (values) => {
    if (!data.currentItemID) {
      postMethod("/api/passwords/add", values)
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
        .catch((err) => console.log(err));
    } else {
      updateMethod("/api/passwords/edit/", data.currentItemID, values)
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
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={data.infoOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={data.infoOpen}>
          <ModalPaper style={{ position: "relative" }}>
            <CloseIcon
              style={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
              onClick={() => handleClose()}
            />
            <form onSubmit={formik.handleSubmit}>
              <TextField
                style={{ marginBottom: "16px" }}
                name="title"
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
                style={{ marginBottom: "16px" }}
                name="username"
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
                        className="copy-icon"
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
                style={{ marginBottom: "16px" }}
                name="password"
                label="Password"
                type={data.showPassword ? "text" : "password"}
                value={formik.values.password}
                variant="standard"
                fullWidth
                inputProps={{
                  autoComplete: "off",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: !data.editMode,
                  disableUnderline: !data.editMode,
                  endAdornment: (
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
                        {!data.editMode && (
                          <ContentCopyIcon
                            className="copy-icon"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigator.clipboard.writeText(
                                data.infoData.password
                              )
                            }
                          />
                        )}
                      </>
                    </InputAdornment>
                  ),
                }}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                style={{ marginBottom: "16px" }}
                name="url"
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
                        className="copy-icon"
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
                <Button type="submit" variant="contained" id="submit-btn">
                  Submit
                </Button>
              )}
            </form>
          </ModalPaper>
        </Fade>
      </StyledModal>
    </div>
  );
}
