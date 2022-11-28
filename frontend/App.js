import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import AbonnementCoach from "./screens/AbonnementCoach/AbonnementCoach";
import DefiCoach from "./screens/DefiCoach/defiCoach";
import EventCoach from "./screens/EventCoach/eventCoach";
import SeanceCoach from "./pages/SeanceCoach/SeanceCoach";
import { LoginCoach } from "./screens/LoginCoach/loginCoach";
import { LieuCoach } from "./screens/LieuCoach/lieuCoach";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => {
          AsyncStorage.clear();
        }}
        title="Logout"
      />
    </View>
  );
};

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
      {/* {user == "Coach" ? ( */}
      <Drawer.Navigator
        useLegacyImplementation
        initialRouteName="Mes lieux"
        screenOptions={{
          headerStyle: { backgroundColor: "#00BFFF" },
          headerTintColor: "#fff",
        }}
      >
        <Drawer.Screen name="Mes lieux" component={LieuCoach} />
        <Drawer.Screen name="Mon abonnement" component={AbonnementCoach} />
        <Drawer.Screen name="Mes programmes" component={SeanceCoach} />
        <Drawer.Screen name="Mes Défis" component={DefiCoach} />
        <Drawer.Screen name="Mes Evenements" component={EventCoach} />
        <Drawer.Screen name="Logout" component={HomeScreen} />
      </Drawer.Navigator>
      {/* ) : (
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
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      )} */}
    </NavigationContainer>
  );
}
