import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { styles } from "./style";
import { FormControl, Input, Stack, Center } from "native-base";
import ProgService from "../../../services/progService";

export const ProgUpdateForm = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <Formik
      initialValues={data}
      onSubmit={(values) => {
        console.log(values);
        ProgService.updateProg(
          values._id,
          values.title,
          values.description,
          values.src,
          values.video
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
                MODIFIER
              </Text>
            </TouchableOpacity>
          </Center>
        </Stack>
      )}
    </Formik>
  );
};
