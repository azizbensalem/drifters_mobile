// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { EventUpdateForm } from "../../components/Event/EventUpdateForm/EventUpdateForm";

const Stack = createNativeStackNavigator();

export const EventCoachUpdate = ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <EventUpdateForm navigation={navigation} route={route} />
    </NativeBaseProvider>
  );
};
