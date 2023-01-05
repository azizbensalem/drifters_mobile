import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { EventCoachAdd } from "./eventCoachAdd";
import { EventCoachShow } from "./eventCoachShow";
import { EventCoachUpdate } from "./eventCoachUpdate";
import ListEventScreen from "./listeventScreen";


const Stack = createNativeStackNavigator();

export const EventCoach = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Les évenements"
        component={ListEventScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ajout d'un évenement" component={EventCoachAdd} />
      <Stack.Screen name="Modifier un évenement" component={EventCoachUpdate} />
      <Stack.Screen name="Afficher un évenement" component={EventCoachShow} />
    </Stack.Navigator>
  );
};
