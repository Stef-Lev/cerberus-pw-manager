import React, { useState, useEffect } from "react";
import MainContext from "./main-context";
import { getAllMethod } from "../helpers/services";

const MainContextProvider = ({ children }) => {
  const [data, setData] = useState({
    records: [],
    loading: true,
    infoOpen: false,
    infoData: {},
    genericOpen: false,
    genericMsg: "",
    editMode: false,
    showPassword: false,
    currentItemID: null
  });

  useEffect(() => {
    let mounted = true;

    getAllMethod("http://localhost:3030/passwords/get")
      .then((result) => {
        if (mounted) {
          setData({ ...data, records: result, loading: false });
        }
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);
  return (
    <MainContext.Provider value={{ data, setData }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
