import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { styles } from "./style";
import {
  Alert,
  FormControl,
  Input,
  Stack,
  VStack,
  HStack,
  Center,
} from "native-base";
import defiService from "../../../services/defi.service";

export const DefiForm = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <Formik
      initialValues={{ nom: "", objectif: "", lien: "", periode: "" }}
      onSubmit={(values) => {
        defiService.postDefi(values).then((rep) => console.log(rep));
        setTimeout(() => {
          navigation.goBack();
        }, 100);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Stack my="10">
          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Nom</FormControl.Label>
              <Input
                name="nom"
                placeholder="Nom du défi"
                style={styles.textInput}
                onChangeText={handleChange("nom")}
                onBlur={handleBlur("nom")}
                value={values.nom}
                keyboardType="nom"
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Objectif</FormControl.Label>
              <Input
                name="objectif"
                placeholder="Objectif"
                style={styles.textInput}
                onChangeText={handleChange("objectif")}
                onBlur={handleBlur("objectif")}
                value={values.objectif}
                keyboardType="objectif"
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Lien</FormControl.Label>
              <Input
                name="lien"
                placeholder="Lien"
                style={styles.textInput}
                onChangeText={handleChange("lien")}
                onBlur={handleBlur("lien")}
                value={values.lien}
                keyboardType="lien"
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Période</FormControl.Label>
              <Input
                name="période"
                placeholder="Période"
                style={styles.textInput}
                onChangeText={handleChange("période")}
                onBlur={handleBlur("période")}
                value={values.période}
                keyboardType="période"
              />
            </Stack>
          </FormControl>

          <Center>
            <TouchableOpacity style={styles.loginBtn}>
              <Text onPress={handleSubmit} style={styles.loginText}>
                AJOUTER
              </Text>
            </TouchableOpacity>
          </Center>
        </Stack>
      )}
    </Formik>
  );
};
