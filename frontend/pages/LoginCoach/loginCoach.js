import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./style";
import {
  FormControl,
  Input,
  Stack,
  Toast,
  NativeBaseProvider,
} from "native-base";
import { Formik } from "formik";
import AuthService from "../../services/coachAuth";

export const LoginCoach = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/drifterslogo.png")}
        />
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            setTimeout(() => {
              AuthService.login(values.email, values.password).then(
                () => {
                  setSuccess(true);
                  setMsg("Authentification effectuée avec succès");
                },
                (e) => {
                  const resMessage =
                    (e.response && e.response.data && e.response.data.msg) ||
                    e.message ||
                    e.toString();

                  setError(true);
                  setMsg(resMessage);
                }
              );
            }, 300);
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <>
              <FormControl isRequired>
                <Stack mx="10" my="2">
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange("email")}
                  />
                </Stack>
              </FormControl>

              <FormControl isRequired>
                <Stack mx="10" my="2">
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                    value={values.password}
                    onChangeText={handleChange("password")}
                  />
                </Stack>
              </FormControl>
              <TouchableOpacity>
                <Text style={styles.forgot_button}>Player account</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginBtn}>
                <Text onPress={handleSubmit} style={styles.loginText}>
                  LOGIN
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {error ? <Toast title={msg} /> : ""}
        {success ? <Toast title={msg} /> : ""}
      </View>
    </NativeBaseProvider>
  );
};
