import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { EventJoueurShow } from "./eventJoueurshow";


import ListEventScreen from "./listeventScreen";

const Stack = createNativeStackNavigator();

export const EventJoueur = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Evenements"
        component={ListEventScreen}
        options={{ headerShown: false }}
      />
     
      <Stack.Screen name="Afficher un évenement" component={EventJoueurShow} />
    </Stack.Navigator>
  );
};
