import React, { useState } from "react";

const ScrollTopBtn = () => {
  const [showGoTop, setShowGoTop] = useState("goTopHidden");

  const scrollUp = () => {};

  return (
    <>
      <div className={showGoTop} onClick={scrollUp}>
        <button className="goTop">
          <i className="goTop__text fas fa-chevron-up" />
        </button>
      </div>
    </>
  );
};
export default ScrollTopBtn;
