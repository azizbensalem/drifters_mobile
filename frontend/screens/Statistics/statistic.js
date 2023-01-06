import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatisticScreen from "./statisticScreen";
import { StatisticAdd } from "./statisticAdd";
import { StatisticUpdate } from "./statisticUpdate";
import { StatisticShow } from "./statisticShow";

const Stack = createNativeStackNavigator();

export const Statistic = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Statistics"
        component={StatisticScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ajout d'une statistique" component={StatisticAdd} />
      <Stack.Screen name="Modifier une statistique" component={StatisticUpdate} />
      <Stack.Screen name="Afficher une statistique" component={StatisticShow} />
    </Stack.Navigator>
  );
};
