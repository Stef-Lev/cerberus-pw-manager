import React from "react";

const Header = () => {
  return (
    <header>
      <img
        src="kerberos.svg"
        alt="cerberus logo"
        style={{
          width: "80px",
          marginRight: "10px",
          color: "#71cceb",
        }}
      />
      <h1>Cerberus</h1>
    </header>
  );
};

export default Header;
