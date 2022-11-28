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
  FormControl,
  Input,
  Button,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
// import {StatForm} from "../../components/Statistiques/Form/statForm"

export default function StatScreen() {
  const [mode, setMode] = useState("Basic");
  const [statFormModalVisible, setStatFormModalVisible] = useState(false);
  const changeModalVisibility = (visbility) => {
    setStatFormModalVisible(visbility);
  };
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
            Liste des statistiques
          </Heading>
          <ScrollView
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          >
            <Basic
              statFormModalVisible={statFormModalVisible}
              changeModalVisibility={changeModalVisibility}
            />
          </ScrollView>
          {/* <StatForm
            statFormModalVisible={statFormModalVisible}
            changeModalVisibility={changeModalVisibility}
          /> */}
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

function Basic(props) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  let data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      nom: "Endurance",
      description: "monitoring de l'endurance",
      type: "Compteur",
      unite: "minutes",
      objectif: "Max",
      lien: "linked",
      avatarUrl:
        "data:image/jpeg;base64,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",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",

      nom: "Vitesse",
      description: "evolution de la vitesse",
      type: "Compteur",
      unite: "m/s",
      objectif: "Max",
      lien: "link2",
      visible: true,
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQXZCSCmhZiwrBRePzTienHLZNrIdCOFeJoQ&usqp=CAU",
    },
  ];
  const [listData, setListData] = useState(data);
  const [selectedItem, setSelectedItem] = useState({});
  const [description, setDescription] = useState("");
  const [objectif, setObjectif] = useState("");
  const [type, setType] = useState("");
  const [nom, setNom] = useState("");
  const [unit, setUnit] = useState("");

  const editStat = () => {
    const newData = [
      {
        key: selectedItem.key,
        id: selectedItem.id,
        nom,
        description,
        objectif,
        type,
        unite: unit,
        lien: "linked",
        avatarUrl: selectedItem.avatarUrl,
      },
      ...listData.filter((item) => item.id !== selectedItem.id),
    ];

    setListData(newData);
    console.log(">>>>>>>>>newDATA:   ", newData);
  };

  const setElements = (item) => {
    setNom(item.nom);
    setDescription(item.description);
    setObjectif(item.objectif);
    setType(item.type);
    setUnit(item.unite);
  };
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

  const renderItem = ({ item, index }) => (
    <>
      <Box key={index}>
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
              <Avatar
                size="48px"
                source={{
                  uri: item.avatarUrl,
                }}
              />
              <VStack>
                <Text
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  bold
                >
                  {item.nom}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.description}
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
                {item.unite}
              </Text>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    </>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => {
          closeRow(rowMap, data.item.key);
          setSelectedItem(data.item);
          setElements(data.item);
          props.changeModalVisibility(true);
        }}
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
            Modifier
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
            Supprimer
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex="1">
      {/* <ScrollView horizontal={true} style={{ width: "100%" }}> */}
      <Modal
        isOpen={props.statFormModalVisible}
        onClose={() => {
          props.changeModalVisibility(false);
          setSelectedItem({});
        }}
        initialFocusRef={selectedItem.id}
        finalFocusRef={selectedItem.id}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Edit stat</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Nom statistique</FormControl.Label>
              <Input
                defaultValue={selectedItem.nom}
                onChangeText={(text) => {
                  setNom(text);
                  console.log(text);
                }}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Description</FormControl.Label>
              <Input
                defaultValue={selectedItem.description}
                onChangeText={(text) => {
                  setDescription(text);
                  console.log(text);
                }}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Type</FormControl.Label>
              <Input
                defaultValue={selectedItem.type}
                onChangeText={(text) => {
                  setType(text);
                  console.log(text);
                }}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Unité</FormControl.Label>
              <Input
                defaultValue={selectedItem.unite}
                onChangeText={(text) => {
                  setUnit(text);
                  console.log(text);
                }}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Objectif</FormControl.Label>
              <Input
                defaultValue={selectedItem.objectif}
                onChangeText={(text) => {
                  setObjectif(text);
                  console.log(text);
                }}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  props.changeModalVisibility(false);
                  setSelectedItem({});
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  editStat();
                  props.changeModalVisibility(false);
                  setSelectedItem({});
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
