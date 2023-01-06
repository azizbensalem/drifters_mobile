import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { ProgUpdateForm } from "../../components/Programme/ProgUpdateForm/ProgUpdateForm";

const Stack = createNativeStackNavigator();

export const ProgCoachUpdate = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <ProgUpdateForm navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
