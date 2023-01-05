import React, { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { styles } from "./style";
import {
  FormControl,
  Input,
  Stack,
  Center,
  VStack,
  HStack,
  Text,
} from "native-base";
import CoachService from "../../services/coach.services";

export const ProfileUpdateForm = ({ user }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <Stack>
      <Formik
        initialValues={user}
        onSubmit={(values) => {
          CoachService.updateCoach(
            values.nom,
            values.prenom,
            values.dateDeNaissance
          )
            .then((rep) => {
              setSuccess(true);
              setMsg(rep.msg);
            })
            .catch((e) => {
              setError(true);
              setMsg(e.msg);
            });
        }}
      >
        {({ handleSubmit, values }) => (
          <Stack my="10">
            <FormControl isRequired>
              <Stack mx="10" my="2">
                <FormControl.Label>Prénom</FormControl.Label>
                <Input
                  name="prenom"
                  placeholder="Prénom"
                  style={styles.textInput}
                  value={values.prenom}
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
                  value={values.nom}
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
                  value={values.dateDeNaissance}
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
    </Stack>
  );
};
