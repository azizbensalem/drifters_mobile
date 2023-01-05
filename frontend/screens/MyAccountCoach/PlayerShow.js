// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { PlayerShow } from "../../components/Players/PlayerShow/PlayerShow";

const Stack = createNativeStackNavigator();

export const LieuCoachShow = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <PlayerShow navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
