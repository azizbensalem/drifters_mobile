// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { DefiForm } from "../../components/Defi/DefiForm/DefiForm";

const Stack = createNativeStackNavigator();

export const DefiCoachAdd = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <DefiForm navigation={navigation} />
    </NativeBaseProvider>
  );
};
