import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { ProgShow } from "../../components/Programme/ProgShow/ProgShow";

const Stack = createNativeStackNavigator();

export const ProgCoachShow = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <ProgShow navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
