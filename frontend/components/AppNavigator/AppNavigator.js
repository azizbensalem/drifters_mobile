import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import MainNavigator from "../MainNavigator/MainNavigator";
import LoginNavigator from "../LoginNavigator/LoginNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";

const AppNavigator = () => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    AsyncStorage.getItem("@user").then((app) => {
      setUser(jwtDecode(app).role);
      console.log(user);
    });
  }, []);

  const { userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {userToken != null ? <MainNavigator /> : <LoginNavigator />}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
