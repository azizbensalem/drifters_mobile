import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { View } from "native-base";
import { Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { SeanceJoueur } from "../../screens/SeanceAujourdhui/seanceJoueur";

import { EventJoueur } from "../../screens/EventJoueur/eventJoueur";
const Drawer = createDrawerNavigator();

const Deconnexion = () => {
  const { logout } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => {
          logout();
        }}
        title="Deconnexion"
      />
    </View>
  );
};

export default function PlayerNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Deconnexion"
      screenOptions={{
        headerStyle: { backgroundColor: "#00BFFF" },
        headerTintColor: "#fff",
      }}
    >
        <Drawer.Screen name="Les Évenements" component={EventJoueur} />
        <Drawer.Screen name="Seance Aujourdhui" component={SeanceJoueur} />
      <Drawer.Screen name="Deconnexion" component={Deconnexion} />
    </Drawer.Navigator>
  );
}
