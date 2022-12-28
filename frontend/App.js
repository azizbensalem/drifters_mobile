import * as React from "react";
import "react-native-gesture-handler";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./components/AppNavigator/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
