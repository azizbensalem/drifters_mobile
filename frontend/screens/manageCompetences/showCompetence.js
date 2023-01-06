import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { CompetenceShow } from "../../components/Competence/Show/CompetenceShow";

const Stack = createNativeStackNavigator();

export const ShowCompetence = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <CompetenceShow navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
