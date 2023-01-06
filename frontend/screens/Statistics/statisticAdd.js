// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatForm } from "../../components/Stat/StatForm/StatForm";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

export const StatisticAdd = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <StatForm navigation={navigation} />
    </NativeBaseProvider>
  );
};
