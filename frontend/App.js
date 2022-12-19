import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
// import SeanceCoach from "./screens/SeanceCoach/SeanceCoach";
import { LoginCoach } from "./screens/LoginCoach/loginCoach";
import { LieuCoach } from "./screens/LieuCoach/lieuCoach";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigator from "./components/MainNavigator/MainNavigator";
import StackNavigator from "./components/StackNavigator/StackNavigator";
import { NativeBaseProvider } from "native-base";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    AsyncStorage.getItem("@user").then((app) => {
      setUser(jwtDecode(app).role);
      console.log(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {user === "Coach" ? <MainNavigator /> : <StackNavigator />}
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
