import React from "react";

const MainContext = React.createContext({
  data: {
    records: [],
    modalOpen: false,
    modalData: {},
  },
  setData: () => {},
});

export default MainContext;
