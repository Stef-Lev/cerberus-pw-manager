import React, { useContext, useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import RecordItem from "./components/RecordItem";
import InfoModal from "./components/InfoModal";
import GenericModal from "./components/GenericModal";
import MainContext from "./contexts/main-context";
import AddButton from "./components/AddButton";
import Loader from "./components/Loader";
import ScrollTopBtn from "./components/ScrollTopBtn";

const MainPage = () => {
  const { data, setData } = useContext(MainContext);
  const [scrollPosition, setSrollPosition] = useState(0);
  const [showGoTop, setShowGoTop] = useState("goTopHidden");

  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);

    if (scrollPosition > 50) {
      return setShowGoTop("goTop");
    } else if (scrollPosition < 50) {
      return setShowGoTop("goTopHidden");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  });

  const refScrollUp = useRef();

  const addRecord = () => {
    setData({ ...data, infoOpen: true, editMode: true, infoData: {} });
  };
  // Add functionality to scroll to top button
  return (
    <div>
      <div ref={refScrollUp}> </div>
      <header>
        <h1>Password Lock</h1>
      </header>
      <section className="container">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {data.loading && <Loader />}
          {!data.loading &&
            data.records.map((item, index) => (
              <RecordItem record={item} key={`item_${index}`} />
            ))}
        </Grid>
        <InfoModal />
        <GenericModal />
        <ScrollTopBtn showGoTop = {showGoTop} handleScrollUp = {handleScrollUp}/>
      </section>
      <AddButton clickAction={addRecord} />
    </div>
  );
};

export default MainPage;
