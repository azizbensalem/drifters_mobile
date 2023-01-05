// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { DefiUpdateForm } from "../../components/Defi/DefiUpdateForm/DefiUpdateForm";

const Stack = createNativeStackNavigator();

export const DefiCoachUpdate = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <DefiUpdateForm navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
