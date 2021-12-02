import React, { useContext, useEffect, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import MainContext from "../contexts/main-context";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
`;

const ModalPaper = styled.div`
  background-color: white;
  border-radius: 8px;
  text-align: center;
  padding: 20px;
  width: 90%;
  z-index: 1;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  animation: modalAnimation 500ms ease-in-out;
  @keyframes modalAnimation {
    0% {
      transform: translateY(-200%);
    }
    100% {
      transform: translateY(0px);
    }
  }
  @media only screen and (min-width: 460px) and (max-width: 767px) {
    width: 400px;
  }
`;

export default function GenericModal() {
  const { data, setData } = useContext(MainContext);

  const handleClose = useCallback(() => {
    setData({
      ...data,
      genericMsg: "",
      genericOpen: false,
    });
    window.location.reload(false);
  }, [data, setData]);

  useEffect(() => {
    if (data.genericOpen) {
      setTimeout(() => {
        handleClose();
      }, 2500);
    }
  }, [data.genericOpen, handleClose]);

  return (
    <div>
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={data.genericOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={data.genericOpen}>
          <ModalPaper>
            <NewReleasesIcon style={{ width: "50px", height: "50px" }} />
            <p
              style={{
                fontSize: "1.4rem",
                marginTop: "1rem",
              }}
            >
              {data.genericMsg}
            </p>
          </ModalPaper>
        </Fade>
      </StyledModal>
    </div>
  );
}
