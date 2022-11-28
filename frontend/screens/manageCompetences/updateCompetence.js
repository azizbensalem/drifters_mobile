import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { CompetenceUpdateForm } from "../../components/Competence/UpdateForm/CompetenceUpdateForm";

const Stack = createNativeStackNavigator();

export const UpdateCompetence = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <CompetenceUpdateForm navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
