import React, { useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from "@mui/material/IconButton";

const ScrollTopBtn = () => {

  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <IconButton aria-label="add" className={`icon-btn__btn--scroll ${visible ? 'visible-scroll' : ''}`} onClick={scrollToTop}>
      <ArrowUpwardIcon className="icon-btn__icon" />
    </IconButton>
  );
};
export default ScrollTopBtn;
