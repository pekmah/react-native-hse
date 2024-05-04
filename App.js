import React, { useState } from "react";
import LandingPage from "./modules/Login";
import Preloader from "./components/Preloader";

const App = () => {

  const [isAppReady, setAppReady] = useState(false);
  
  const checkIfAppReady = () => {
    setTimeout(() => {
      setAppReady(true);
    }, 3000);
  }

  checkIfAppReady();

  if (!isAppReady) {
    return <Preloader />;
  }



  return <LandingPage />;

};


export default App;