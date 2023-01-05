import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { LoginCoach } from "../../screens/LoginCoach/loginCoach";
import { RegisterCoach } from "../../screens/RegisterCoach/registerCoach";

const Drawer = createDrawerNavigator();

export default function LoginNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Register"
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
      <Drawer.Screen
        name="Register"
        component={RegisterCoach}
        headerShown={false}
        options={{ headerMode: "none", headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
