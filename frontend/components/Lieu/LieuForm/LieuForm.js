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

export const LieuForm = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <Formik
      initialValues={{ nom: "", ville: "", pays: "", adresse: "" }}
      onSubmit={(values) => {
        LieuService.postLieu(values).then((rep) => console.log(rep));
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
                AJOUTER
              </Text>
            </TouchableOpacity>
          </Center>
        </Stack>
      )}
    </Formik>
  );
};
