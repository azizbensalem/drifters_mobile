import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { DefiShow } from "../../components/Defi/DefiShow/DefiShow";

const Stack = createNativeStackNavigator();

export const DefiCoachShow = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <DefiShow navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
