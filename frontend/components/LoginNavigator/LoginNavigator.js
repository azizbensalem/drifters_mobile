import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { LoginCoach } from "../../screens/LoginCoach/loginCoach";

const Drawer = createDrawerNavigator();

export default function LoginNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: "#00BFFF" },
        headerTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="Login"
        component={LoginCoach}
        headerShown={false}
        options={{ headerMode: "none", headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
