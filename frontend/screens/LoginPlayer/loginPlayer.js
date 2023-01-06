import React, { useState } from "react";
import { View, Image } from "react-native";
import { styles } from "./style";
import { NativeBaseProvider } from "native-base";
import { AuthPlayerForm } from "../../components/AuthPlayerForm/AuthPlayerForm";

export const LoginPlayer = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/drifterslogo.png")}
        />
        <AuthPlayerForm navigation={navigation} />
      </View>
    </NativeBaseProvider>
  );
};
