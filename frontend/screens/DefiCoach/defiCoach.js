import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListDefiScreen from "./listDefiScreen";
import { DefiCoachAdd } from "./defiCoachAdd";
import { DefiCoachUpdate } from "./defiCoachUpdate";
import { DefiCoachShow } from "./defiCoachShow";

const Stack = createNativeStackNavigator();

export const DefiCoach = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Défis"
        component={ListDefiScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ajout d'un défi" component={DefiCoachAdd} />
      <Stack.Screen name="Modifier un défi" component={DefiCoachUpdate} />
      <Stack.Screen name="Afficher un défi" component={DefiCoachShow} />
    </Stack.Navigator>
  );
};
