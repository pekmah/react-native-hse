import React, { useState } from "react";
import LandingPage from "./modules/Login";
import Dashboard from "./modules/DashboardScreen";
import Preloader from "./components/Preloader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./config/CredentialsContext";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const CheckLoginCredentials = async () => {
    const userToken = await AsyncStorage.getItem("token");
    if (userToken) {
      setUserToken(JSON.parse(userToken));

    } else {
      setUserToken(null);
    }
  };


  if (!appReady) {
    return (
      <Preloader
        startAsync={CheckLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <CredentialsContext.Provider value={{ userToken, setUserToken }}>
      <LandingPage />
    </CredentialsContext.Provider>
  );

};


