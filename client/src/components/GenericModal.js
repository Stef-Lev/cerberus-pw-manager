import React, { useContext } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import MainContext from "../contexts/main-context";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import styled from 'styled-components';

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: "8px",
//     textAlign: "center",
//     transform: "translateY(100px)",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(4, 2, 4),
//     [theme.breakpoints.down('md')]: {
//       width: "90%",
//     },
//     [theme.breakpoints.between("sm", 'lg')]: {
//       width: "66%",
//     },
//     [theme.breakpoints.up("md")]: {
//       width: "550px",
//     },
//     "&:focus-visible": {
//       outline: "none",
//     },
//     animation: `$modalAnimation 500ms ${theme.transitions.easing.easeInOut}`,
//   },
//   modalMessage: {
//     fontSize: "1.4rem",
//     marginTop: "1rem",
//   },
//   "@keyframes modalAnimation": {
//     "0%": {
//       transform: "translateY(-200%)",
//     },
//     "100%": {
//       transform: "translateY(100px)",
//     },
//   },
// }));

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
width: 50%;
`;

export default function GenericModal() {
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
            <p style={{
              fontSize: "1.4rem", 
              marginTop: "1rem",}}>{data.genericMsg}</p>
          </ModalPaper>
        </Fade>
      </StyledModal>
    </div>
  );
}
