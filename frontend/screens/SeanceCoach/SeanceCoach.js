import React, { useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Center,
  Modal,
  Button,
  FormControl,
  Input,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function SeanceCoach() {
  const [mode, setMode] = useState("Basic");
  return (
    <NativeBaseProvider>
      <Center h="100%">
        <Box
          _dark={{
            bg: "coolGray.800",
          }}
          _light={{
            bg: "white",
          }}
          flex="1"
          safeAreaTop
          maxW="400px"
          w="100%"
        >
          <Heading p="4" pb="3" size="lg">
            Liste des Programmes séances
          </Heading>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Basic />
          </ScrollView>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

function Basic() {
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [listData, setListData] = useState([
    {
      id: 1,
      title: "Prog_Séance Lifting",
      avatar: "https://joeschmoe.io/api/v1/random",
      stats: ["Body control"],
      description: "Lift a building",
      competence: ["Competence est non mesurable", " curiosity"],
      video: "Lien pour la video",
    },
    {
      id: 2,
      title: "Prog_Séance Running",
      avatar: "https://joeschmoe.io/api/v1/random",
      stats: ["Marathon training", "half-marathon"],
      description: "5K",
      competence: ["Competence est non mesurable", " idk"],
      video: "https://www.youtube.com/watch?v=W4eKVKwf3rQ",
    },
    {
      id: 3,
      title: "Prog_Séance Swimming",
      avatar: "https://joeschmoe.io/api/v1/random",
      stats: ["Workouts to gain more strength", " masse de muscle"],
      description: "train for 100m Olympics",
      competence: ["Competence est non mesurable", " calmness"],
      video: "Lien pour la video",
    },
    {
      id: 4,
      title: "Prog_Séance Yoga",
      avatar: "https://joeschmoe.io/api/v1/random",
      stats: ["Workouts to gain more strength"],
      description: "1h run with weights, 20 pushups, balance game",
      competence: ["Competence est non mesurable", " flexibility"],
      video: "Lien pour la video",
    },
    {
      id: 5,
      title: "Prog_Séance Tennis",
      avatar: "https://joeschmoe.io/api/v1/random",
      stats: ["speed", " endurance"],
      description: "djokovic in the making",
      competence: ["Competence est non mesurable", " curiosity"],
      video: "Lien pour la video",
    },
  ]);
  const [titleToUpdate, setTitleToUpdate] = useState();
  const [descriptionToUpdate, setDescriptionToUpdate] = useState();
  const updateProg = async (id, title) => {
    const newData = listData.map((data) =>
      data.id === id ? { id, title, description, competence, stats } : data
    );
    setListData(newData);
    setOpen(false);
  };
  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        onPress={() => console.log("You Item n°: ", index)}
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {item.title}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.recentText}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              alignSelf="flex-start"
            >
              {item.stats}
            </Text>
          </HStack>
          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            safeAreaTop={true}
          >
            <Modal.Content maxWidth="350">
              <Modal.CloseButton />
              <Modal.Header>Mettre à jour le programme</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label
                    _text={{
                      bold: true,
                    }}
                  >
                    Titre du programme
                  </FormControl.Label>
                  <Input
                    placeholder={item.title}
                    value={item.title}
                    onChange={(e) => setTitleToUpdate(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label
                    _text={{
                      bold: true,
                    }}
                  >
                    Description du programme
                  </FormControl.Label>
                  <Input
                    placeholder={item.description}
                    value={item.description}
                    onChange={(e) => setDescriptionToUpdate(e.target.value)}
                  />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button onPress={updateProg} mt="5" colorScheme="cyan">
                  submit
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => setOpen(true)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            MàJ
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex="1">
      {/* <ScrollView horizontal={true} style={{ width: "100%" }}> */}
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
      {/* </ScrollView> */}
    </Box>
  );
}
