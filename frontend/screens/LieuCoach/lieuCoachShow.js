// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { LieuShow } from "../../components/Lieu/LieuShow/LieuShow";

const Stack = createNativeStackNavigator();

export const LieuCoachShow = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <LieuShow navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
