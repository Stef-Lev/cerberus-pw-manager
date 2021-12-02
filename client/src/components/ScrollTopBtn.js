import React, { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";

const ScrollTopBtn = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 400) {
      setVisible(true);
    } else if (scrolled <= 400) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <IconButton
      aria-label="scroll"
      className={`icon-btn__btn--scroll ${visible ? "visible-scroll" : ""}`}
      onClick={scrollToTop}
      size="large">
      <ArrowUpwardIcon className="icon-btn__icon" />
    </IconButton>
  );
};
export default ScrollTopBtn;
