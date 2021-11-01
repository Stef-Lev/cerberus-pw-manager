import React, { useState, useEffect } from "react";

const ScrollTopBtn = ({showGoTop,handleScrollUp}) => {
  
  return (
    <>
      <div className={showGoTop} onClick={handleScrollUp}>
        <button className="goTop">
          <i className="goTop__text fas fa-chevron-up" />
        </button>
      </div>
    </>
  );
};
export default ScrollTopBtn;
