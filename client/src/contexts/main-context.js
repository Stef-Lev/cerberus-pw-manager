import React from "react";

const MainContext = React.createContext({
  data: {
    records: [],
    infoOpen: false,
    infoData: {},
  },
  setData: () => {},
});

export default MainContext;
