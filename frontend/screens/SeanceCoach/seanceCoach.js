import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SeanceCoachAdd } from "./seanceCoachAdd";
import { SeanceCoachShow } from "./seanceCoachShow";
import ListSeanceScreen from "./listseanceScreen";

const Stack = createNativeStackNavigator();

export const SeanceCoach = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="seances"
        component={ListSeanceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ajout d'une séance" component={SeanceCoachAdd} />
      <Stack.Screen name="Afficher une Séance" component={SeanceCoachShow} />
    </Stack.Navigator>
  );
};
