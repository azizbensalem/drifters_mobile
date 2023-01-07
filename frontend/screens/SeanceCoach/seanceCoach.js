import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SeanceCoachAdd } from "./seanceCoachAdd";
import { SeanceCoachShow } from "./seanceCoachShow";
import ListSeanceScreen from "./listseanceScreen";
import { SeanceCoachUpdate } from "./seanceCoachUpdate";

const Stack = createNativeStackNavigator();

export const SeanceCoach = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mes séances"
        component={ListSeanceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ajout d'une séance" component={SeanceCoachAdd} />
      <Stack.Screen name="Modifier une séance" component={SeanceCoachUpdate} />
      <Stack.Screen name="Afficher une séance" component={SeanceCoachShow} />
    </Stack.Navigator>
  );
};
