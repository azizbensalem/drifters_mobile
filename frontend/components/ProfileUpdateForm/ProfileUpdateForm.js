import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { styles } from "./style";
import { FormControl, Input, Stack, Center, Text } from "native-base";
import CoachService from "../../services/coach.services";

export const ProfileUpdateForm = ({ user }) => {
  const [data, setData] = useState(user);

  function handleChange(key, value) {
    setData({ ...data, [key]: value });
  }

  const handleSubmit = () => {
    CoachService.updateCoach(data.nom, data.prenom, data.dateDeNaissance).then(
      (e) => console.log(e.message)
    );
  };
  return (
    <Stack>
      <Stack my="10">
        <FormControl isRequired>
          <Stack mx="10" my="2">
            <FormControl.Label>Prénom</FormControl.Label>
            <Input
              name="prenom"
              placeholder="Prénom"
              style={styles.textInput}
              value={data.prenom}
              onChangeText={(value) => handleChange("prenom", value)}
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
              value={data.nom}
              onChangeText={(value) => handleChange("nom", value)}
            />
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <Stack mx="10" my="2">
            <FormControl.Label>Date de naissance</FormControl.Label>
            <Input
              name="dateDeNaissance"
              placeholder="Date de naissance"
              style={styles.textInput}
              value={data.dateDeNaissance}
              onChangeText={(value) => handleChange("dateDeNaissance", value)}
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
    </Stack>
  );
};
