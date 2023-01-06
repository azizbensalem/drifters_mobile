import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListProgScreen from "./listProgScreen";
import { ProgCoachAdd } from "./progCoachAdd";
import { ProgCoachUpdate } from "./progCoachUpdate";
import { ProgCoachShow } from "./progCoachShow";

const Stack = createNativeStackNavigator();

export const ProgCoach = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Programmes"
        component={ListProgScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ajout d'un programme" component={ProgCoachAdd} />
      <Stack.Screen name="Modifier un programme" component={ProgCoachUpdate} />
      <Stack.Screen name="Afficher un programme" component={ProgCoachShow} />
    </Stack.Navigator>
  );
};
