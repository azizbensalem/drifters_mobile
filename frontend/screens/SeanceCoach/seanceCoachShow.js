// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

import { SeanceShow } from "../../components/Seance/SeanceShow/SeanceShow";

const Stack = createNativeStackNavigator();

export const SeanceCoachShow = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <SeanceShow navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
