// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



import { SeanceForm } from "../../components/Seance/SeanceForm/SeanceForm";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

export const SeanceCoachAdd = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <SeanceForm navigation={navigation} />
    </NativeBaseProvider>
  );
};
