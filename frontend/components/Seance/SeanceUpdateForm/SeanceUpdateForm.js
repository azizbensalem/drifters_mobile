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
import SeanceService from "../../../services/seance.service";

export const SeanceUpdateForm = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <Formik
      initialValues={data}
      onSubmit={(values) => {
        console.log(values);
        SeanceService.updateSeance(
          values._id,
          values.nom,
          values.date,
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
                placeholder="Nom de la Séance "
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
              <FormControl.Label>Periode</FormControl.Label>
              <Input
                name="periode"
                placeholder="periode"
                style={styles.textInput}
                onChangeText={handleChange("periode")}
                onBlur={handleBlur("periode")}
                value={values.periode}
                keyboardType="periode"
              />
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Date</FormControl.Label>
              <Input
                name="date"
                placeholder="date"
                style={styles.textInput}
                onChangeText={handleChange("date")}
                onBlur={handleBlur("date")}
                value={values.date}
                keyboardType="date"
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
