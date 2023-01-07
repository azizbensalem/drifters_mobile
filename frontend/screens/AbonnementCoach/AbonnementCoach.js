import React, { useContext, useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Radio,
  Heading,
  Box,
  Text,
  Modal,
  Button,
  Container,
  Stack,
  FormControl,
} from "native-base";
import { abonnementStyles } from "./styles";
import { Formik } from "formik";
import { AuthService } from "../../services/coachAuth";
import CoachService from "../../services/coach.services";
import { AuthContext } from "../../context/AuthContext";
import { TouchableOpacity } from "react-native";

export default function AbonnementCoach() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const { abonnement } = useContext(AuthContext);

  return (
    <NativeBaseProvider>
      <Box style={abonnementStyles.header}>
        <Heading size="xl" mb="4">
          <Text>Abonnement</Text>
        </Heading>
        <Text fontSize="xl">Votre plan actuel est {abonnement}</Text>
        <Text fontSize="xl">Choisissez l'un des trois plans disponibles</Text>
        {open ? <Text fontSize="xl">Plan modifié</Text> : ""}
        {error ? (
          <Text fontSize="xl">Veuiller remplir le formulaire SVP</Text>
        ) : (
          ""
        )}
      </Box>
      <Container style={abonnementStyles.container}>
        <Formik
          initialValues={{ abonnement: abonnement }}
          onSubmit={(values) => {
            console.log(values);
            if (values.abonnement != "") {
              CoachService.updateAbonnement(values.abonnement)
                .then((e) => {
                  setOpen(true);
                  setError(false);
                })
                .catch((e) => console.log(e));
            } else {
              setError(true);
              setOpen(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <Stack my="1">
              <FormControl isRequired>
                <Radio.Group
                  name="abonnement"
                  accessibilityLabel="favorite colorscheme"
                  value={values.abonnement}
                  onChange={handleChange("abonnement")}
                >
                  <Radio
                    colorScheme="emerald"
                    name="abonnement"
                    value="Free"
                    my={1}
                  >
                    Free
                  </Radio>
                  <Text style={abonnementStyles.radioSubText}>
                    Le plan FREE vous permet d'avoir 3 joueurs inscris
                    gratuitement.
                  </Text>
                  <Radio
                    colorScheme="emerald"
                    name="abonnement"
                    value="Basic"
                    my={1}
                  >
                    Basic
                  </Radio>
                  <Text style={abonnementStyles.radioSubText}>
                    Le plan BASIC vous permet d'avoir 10 joueurs inscris.
                  </Text>
                  <Radio
                    colorScheme="emerald"
                    name="abonnement"
                    value="Premium"
                    my={1}
                  >
                    Premium
                  </Radio>
                  <Text style={abonnementStyles.radioSubText}>
                    Le plan PREMIUM n'impose aucun limite au nombre de joueurs
                    inscris.
                  </Text>
                </Radio.Group>
                <TouchableOpacity style={abonnementStyles.loginBtn}>
                  <Text
                    onPress={() => {
                      handleSubmit();
                    }}
                    style={abonnementStyles.loginText}
                  >
                    Confirmer
                  </Text>
                </TouchableOpacity>
              </FormControl>
              {/* <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                safeAreaTop={true}
              >
                <Modal.Content maxWidth="350">
                  <Modal.CloseButton />
                  <Modal.Header>Confirmation de l'abonnement</Modal.Header>
                  <Modal.Body>
                    <Text>
                      Veuillez confirmer votre choix pour le nouveau plan
                      adopté!
                    </Text>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button
                        onPress={() => {
                          handleSubmit();
                          setOpen(false);
                        }}
                      >
                        Confirmer
                      </Button>
                      <Button
                        variant="ghost"
                        colorScheme="blueGray"
                        onPress={() => {
                          setAbonnement(3);
                          setOpen(false);
                        }}
                      >
                        Annuler
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal> */}
            </Stack>
          )}
        </Formik>
      </Container>
    </NativeBaseProvider>
  );
}
