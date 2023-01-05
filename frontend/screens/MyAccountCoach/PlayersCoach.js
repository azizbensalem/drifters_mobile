import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PlayerUpdate } from "./PlayerUpdate";
import { PlayerShow } from "../../components/Players/PlayerShow/PlayerShow";
import ListPlayers from "./ListPlayers";

const Stack = createNativeStackNavigator();

export const PlayersCoach = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Liste des joueurs"
        component={ListPlayers}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Modifier un joueur" component={PlayerUpdate} />
      <Stack.Screen name="Afficher un joueur" component={PlayerShow} />
    </Stack.Navigator>
  );
};
