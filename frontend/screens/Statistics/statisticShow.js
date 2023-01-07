// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { StatShow } from "../../components/Stat/StatShow/StatShow";

const Stack = createNativeStackNavigator();

export const StatisticShow = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <StatShow navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
