// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { EventForm } from "../../components/Event/EventForm/EventForm";

const Stack = createNativeStackNavigator();

export const EventCoachAdd = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <EventForm navigation={navigation} />
    </NativeBaseProvider>
  );
};
