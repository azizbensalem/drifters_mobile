import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { EventShow } from "../../components/Event/EventShow/EventShow";

const Stack = createNativeStackNavigator();

export const EventCoachShow = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <EventShow navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
