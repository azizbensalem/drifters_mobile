import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { ProgForm } from "../../components/Programme/ProgForm/ProgForm";

const Stack = createNativeStackNavigator();

export const ProgCoachAdd = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <ProgForm navigation={navigation} />
    </NativeBaseProvider>
  );
};
