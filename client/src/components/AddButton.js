import React from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

const AddButton = ({ clickAction }) => {
  return (
    <IconButton aria-label="add" className="icon-btn__btn--add" onClick={clickAction}>
      <AddIcon className="icon-btn__icon" />
    </IconButton>
  );
};

export default AddButton;
