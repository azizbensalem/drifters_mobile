import React, { useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import {
  NativeBaseProvider,
  Radio,
  Heading,
  Box,
  Text,
  Modal,
  Button,
  Container,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { abonnementStyles } from "./styles";

export default function AbonnementCoach() {
  const [abonnement, setAbonnement] = useState(3);
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);

  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };

  return (
    <NativeBaseProvider>
      <Box style={abonnementStyles.header}>
        <Heading size="xl" mb="4">
          <Text>Abonnement</Text>
        </Heading>
        <Text fontSize="xl">Choisissez l'un des trois plans disponibles</Text>
      </Box>
      <Container style={abonnementStyles.container}>
        <Radio.Group
          defaultValue="3"
          name="OptionAbonnement"
          accessibilityLabel="favorite colorscheme"
          onChange={openModal}
        >
          <Radio colorScheme="emerald" value="3" my={1}>
            Free
          </Radio>
          <Text style={abonnementStyles.radioSubText}>
            Le plan FREE vous permet d'avoir 3 joueurs inscris gratuitement.
          </Text>
          <Radio colorScheme="emerald" value="10" my={1}>
            Basic
          </Radio>
          <Text style={abonnementStyles.radioSubText}>
            Le plan BASIC vous permet d'avoir 10 joueurs inscris.
          </Text>
          <Radio colorScheme="emerald" value="1" my={1}>
            Premium
          </Radio>
          <Text style={abonnementStyles.radioSubText}>
            Le plan PREMIUM n'impose aucun limite au nombre de joueurs inscris.
          </Text>
        </Radio.Group>
        <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Header>Confirmation de l'abonnement</Modal.Header>
            <Modal.Body>
              <Text>
                Veuillez confirmer votre choix pour le nouveau plan adopté!
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  onPress={() => {
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
        </Modal>
      </Container>
    </NativeBaseProvider>
  );
}
