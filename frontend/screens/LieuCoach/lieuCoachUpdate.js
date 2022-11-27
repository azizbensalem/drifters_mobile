// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LieuForm } from "../../components/Lieu/LieuForm/LieuForm";
import { NativeBaseProvider } from "native-base";
import { LieuUpdateForm } from "../../components/Lieu/LieuUpdateForm/LieuUpdateForm";

const Stack = createNativeStackNavigator();

export const LieuCoachUpdate = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <LieuUpdateForm navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
