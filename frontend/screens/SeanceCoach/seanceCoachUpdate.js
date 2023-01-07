import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { SeanceUpdateForm } from "../../components/Seance/SeanceUpdateForm/SeanceUpdateForm";

const Stack = createNativeStackNavigator();

export const SeanceCoachUpdate = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <SeanceUpdateForm navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
