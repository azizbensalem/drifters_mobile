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
import eventService from "../../../services/evenement.service";

export const EventForm = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <Formik
      initialValues={{ nom: "", description: "", date: "" }}
      onSubmit={(values) => {
        eventService.postEvent(values).then((rep) => console.log(rep));
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
                placeholder="Nom du L'évenement"
                style={styles.textInput}
                onChangeText={handleChange("nom")}
                onBlur={handleBlur("nom")}
                value={values.nom}
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label> Description</FormControl.Label>
              <Input
                name="description"
                placeholder="description"
                style={styles.textInput}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Date</FormControl.Label>
              <Input
                name="date"
                placeholder="Date"
                style={styles.textInput}
                onChangeText={handleChange("date")}
                onBlur={handleBlur("date")}
                value={values.date}
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
