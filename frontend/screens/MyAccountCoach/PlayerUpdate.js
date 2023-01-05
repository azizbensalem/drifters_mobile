import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { PlayerUpdateForm } from "../../components/Players/PlayerUpdateForm/PlayerUpdateForm";

const Stack = createNativeStackNavigator();

export const PlayerUpdate = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <PlayerUpdateForm navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
