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

export const DefiUpdateForm = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <Formik
      initialValues={data}
      onSubmit={(values) => {
        console.log(values);
        defiService
          .updateDefi(
            values._id,
            values.nom,
            values.objectif,
            values.lien,
            values.periode
          )
          .then((rep) => console.log("resp", rep))
          .catch((e) => console.log("error", e));
        setTimeout(() => {
          navigation.goBack();
        }, 200);
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
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Période</FormControl.Label>
              <Input
                name="periode"
                placeholder="Période"
                style={styles.textInput}
                onChangeText={handleChange("periode")}
                onBlur={handleBlur("periode")}
                value={values.periode}
                keyboardType="periode"
              />
            </Stack>
          </FormControl>

          <Center>
            <TouchableOpacity style={styles.loginBtn}>
              <Text onPress={handleSubmit} style={styles.loginText}>
                EDIT
              </Text>
            </TouchableOpacity>
          </Center>
        </Stack>
      )}
    </Formik>
  );
};
