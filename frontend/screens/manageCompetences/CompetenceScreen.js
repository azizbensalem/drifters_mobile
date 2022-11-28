import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CompetenceList } from "./competenceList";
import { AddCompetence } from "./addCompetence";
import { UpdateCompetence } from "./updateCompetence";
import { ShowCompetence } from "./showCompetence";

const Stack = createNativeStackNavigator();

export const CompetenceScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lieux"
        component={CompetenceList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ajout d'un competence" component={AddCompetence} />
      <Stack.Screen
        name="Modifier un competence"
        component={UpdateCompetence}
      />
      <Stack.Screen name="Afficher un competence" component={ShowCompetence} />
    </Stack.Navigator>
  );
};
