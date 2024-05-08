import React, { useState } from "react";
import LandingPage from "./modules/Login";
import Preloader from "./components/Preloader";
import { View, StyleSheet } from "react-native";

const App = () => {

  const [isAppReady, setAppReady] = useState(false);

  const checkIfAppReady = () => {
    setTimeout(() => {
      setAppReady(true);
    }, 3000);
  }

  checkIfAppReady();

  if (!isAppReady) {
    return <View style={styles.preloaderContainer}>
      <Preloader />
    </View>;
  }
  else{
    return <LandingPage />;
  
  }

};

const styles = StyleSheet.create({
  preloaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});


export default App;