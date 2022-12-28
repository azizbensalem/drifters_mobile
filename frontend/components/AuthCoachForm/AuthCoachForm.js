import React, { useContext, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { styles } from "./style";
import { Alert, FormControl, Input, Stack, VStack, HStack } from "native-base";
import { AuthContext } from "../../context/AuthContext";

export const AuthCoachForm = () => {
  const { login, success, msg, error } = useContext(AuthContext);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        login(values.email, values.password);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <>
          <FormControl isRequired>
            <Stack mx="10" my="2">
              {success ? (
                <Alert w="100%" colorScheme="success" status="success">
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack space={2} flexShrink={1} alignItems="center">
                        <Text color="left-accent">{msg}</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Alert>
              ) : (
                ""
              )}
              {error ? (
                <Alert w="100%" colorScheme="error" status="error" my="1">
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack space={2} flexShrink={1} alignItems="center">
                        <Text color="left-accent">{msg}</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Alert>
              ) : (
                ""
              )}
              <FormControl.Label>Email</FormControl.Label>
              <Input
                name="email"
                placeholder="Email Address"
                style={styles.textInput}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Password</FormControl.Label>
              <Input
                name="password"
                placeholder="Password"
                style={styles.textInput}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
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
  );
};
