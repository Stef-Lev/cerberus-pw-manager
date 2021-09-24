import React, { useState, useEffect } from "react";
import MainContext from "./main-context";

const MainContextProvider = ({ children }) => {
  const [data, setData] = useState({
    records: [],
    modalOpen: false,
    modalData: {},
  });

  useEffect(() => {
    let mounted = true;

    fetch("http://localhost:3030/passwords/get")
      .then((response) => response.json())
      .then((result) => {
        if (mounted) {
          setData({ ...data, records: result });
        }
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MainContext.Provider value={{ data, setData }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
