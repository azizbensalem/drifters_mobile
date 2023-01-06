import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import CoachNavigator from "../CoachNavigator/CoachNavigator";
import LoginNavigator from "../LoginNavigator/LoginNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";
import PlayerNavigator from "../PlayerNavigator/PlayerNavigator";

const AppNavigator = () => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    AsyncStorage.getItem("@user").then((app) => {
      setUser(jwtDecode(app).role);
      console.log(user);
    });
  }, []);

  const { userToken } = useContext(AuthContext);

  if (userToken == null) {
    return (
      <NavigationContainer>
        <NativeBaseProvider>
          <LoginNavigator />
        </NativeBaseProvider>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <NativeBaseProvider>
          {user == "Coach" ? <CoachNavigator /> : <PlayerNavigator />}
        </NativeBaseProvider>
      </NavigationContainer>
    );
  }
};

export default AppNavigator;
