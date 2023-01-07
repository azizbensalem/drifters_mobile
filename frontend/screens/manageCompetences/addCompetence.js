// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CompetenceForm } from "../../components/Competence/Form/competenceForm";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

export const AddCompetence = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <CompetenceForm navigation={navigation} />
    </NativeBaseProvider>
  );
};
