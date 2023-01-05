import React, { useContext, useState } from "react";
import { DatePickerIOSBase, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { styles } from "./style";
import { Alert, FormControl, Input, Stack, VStack, HStack } from "native-base";
import { AuthService } from "../../services/coachAuth";

export const RegisterCoachForm = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <Formik
      initialValues={{ email: "", password: "", nom: "", prenom: "" }}
      onSubmit={(values) => {
        AuthService.register(
          values.email,
          values.password,
          values.nom,
          values.prenom
        )
          .then((e) => {
            setSuccess(true);
            setMsg(e.msg);
          })
          .catch((e) => {
            const resMessage =
              (e.response && e.response.data && e.response.data.msg) ||
              e.message ||
              e.toString();
            setError(true);
            setMsg(resMessage);
          });
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
              <FormControl.Label>Prénom</FormControl.Label>
              <Input
                name="prenom"
                placeholder="Prénom"
                style={styles.textInput}
                onChangeText={handleChange("prenom")}
                onBlur={handleBlur("prenom")}
                value={values.prenom}
                keyboardType="default"
              />
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Nom</FormControl.Label>
              <Input
                name="nom"
                placeholder="Nom"
                style={styles.textInput}
                onChangeText={handleChange("nom")}
                onBlur={handleBlur("nom")}
                value={values.nom}
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
          <TouchableOpacity
            style={styles.forgot_button}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text>Login coach</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgot_button}>
            <Text>Login player</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
            <Text onPress={handleSubmit} style={styles.loginText}>
              REGISTER
            </Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};
