import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SeanceJoueurShow } from "./seanceJoueurShow";
import ListSeanceJouScreen from "./listseanceJouScreen";

const Stack = createNativeStackNavigator();

export const SeanceJoueur = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="seances"
        component={ListSeanceJouScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Afficher une Séance" component={SeanceJoueurShow} />
    </Stack.Navigator>
  );
};