import { useState, useEffect } from "react";

const useDisclaimer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("hasSeenDisclaimer");
    const hasSeenDisclaimer = storedData ? JSON.parse(storedData) : false;
    setShowDisclaimer(!hasSeenDisclaimer);
  }, []);

  const handleCloseDisclaimer = () => {
    localStorage.setItem("hasSeenDisclaimer", JSON.stringify(true));
    setShowDisclaimer(false);
  };

  return { showDisclaimer, handleCloseDisclaimer };
};

export default useDisclaimer;
