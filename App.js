import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { appCheckInit } from "./src/database/firebase";
import Router from "./src/routers";

const App = () => {
  useEffect(() => {
    appCheckInit();
  }, []);

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
