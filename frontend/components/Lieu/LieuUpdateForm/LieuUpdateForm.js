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
import LieuService from "../../../services/lieu.service";

export const LieuUpdateForm = ({ route, navigation }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const { data } = route.params;
  return (
    <Formik
      initialValues={data}
      onSubmit={(values) => {
        console.log(values);
        LieuService.updateLieu(
          values._id,
          values.nom,
          values.ville,
          values.pays,
          values.adresse
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
                placeholder="Nom du lieu"
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
              <FormControl.Label>Adresse</FormControl.Label>
              <Input
                name="adresse"
                placeholder="Adresse"
                style={styles.textInput}
                onChangeText={handleChange("adresse")}
                onBlur={handleBlur("adresse")}
                value={values.adresse}
                keyboardType="adresse"
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Ville</FormControl.Label>
              <Input
                name="ville"
                placeholder="Ville"
                style={styles.textInput}
                onChangeText={handleChange("ville")}
                onBlur={handleBlur("ville")}
                value={values.ville}
                keyboardType="ville"
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Pays</FormControl.Label>
              <Input
                name="pays"
                placeholder="Pays"
                style={styles.textInput}
                onChangeText={handleChange("pays")}
                onBlur={handleBlur("pays")}
                value={values.pays}
                keyboardType="pays"
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
