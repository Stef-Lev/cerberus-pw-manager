import React from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

const AddButton = ({ clickAction }) => {
  return (
    <IconButton aria-label="add" className="add-btn" onClick={clickAction}>
      <AddIcon className="add-icon" />
    </IconButton>
  );
};

export default AddButton;
