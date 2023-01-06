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
import ProgService from "../../../services/progService";

export const ProgForm = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ title: "", description: "", src: "", video: "" }}
      onSubmit={(values) => {
        ProgService.postProg(values).then((rep) => console.log(rep));
        setTimeout(() => {
          navigation.goBack();
        }, 100);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Stack my="10">
          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Titre</FormControl.Label>
              <Input
                name="title"
                placeholder="Titre du programme séance"
                style={styles.textInput}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Description</FormControl.Label>
              <Input
                name="description"
                placeholder="Description"
                style={styles.textInput}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Src</FormControl.Label>
              <Input
                name="src"
                placeholder="Src"
                style={styles.textInput}
                onChangeText={handleChange("src")}
                onBlur={handleBlur("src")}
                value={values.src}
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Vidéo</FormControl.Label>
              <Input
                name="video"
                placeholder="Vidéo"
                style={styles.textInput}
                onChangeText={handleChange("video")}
                onBlur={handleBlur("video")}
                value={values.video}
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
