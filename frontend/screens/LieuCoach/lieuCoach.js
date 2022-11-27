import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListLieuScreen from "./listLieuScreen";
import { LieuCoachAdd } from "./lieuCoachAdd";
import { LieuCoachUpdate } from "./lieuCoachUpdate";
import { LieuCoachShow } from "./lieuCoachShow";

const Stack = createNativeStackNavigator();

export const LieuCoach = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lieux"
        component={ListLieuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ajout d'un lieu" component={LieuCoachAdd} />
      <Stack.Screen name="Modifier un lieu" component={LieuCoachUpdate} />
      <Stack.Screen name="Afficher un lieu" component={LieuCoachShow} />
    </Stack.Navigator>
  );
};
