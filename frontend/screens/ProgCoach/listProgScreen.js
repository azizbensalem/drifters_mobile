import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Pressable,
  HStack,
  VStack,
  Spacer,
  NativeBaseProvider,
  Center,
  Heading,
  Fab,
  Icon,
  Button,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import ProgService from "../../services/progService";

export default function ListProgScreen({ navigation }) {
  const [listData, setListData] = useState("");

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    ProgService.deleteProg(rowKey);
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HStack flex="1" pl="2">
        <Pressable
          w="70"
          ml="auto"
          cursor="pointer"
          bg="success.700"
          justifyContent="center"
          onPress={() =>
            navigation.navigate("Modifier un programme", { data: data.item })
          }
          _pressed={{
            opacity: 0.5,
          }}
        >
          <VStack alignItems="center" space={2}>
            <Icon as={<Entypo name="edit" />} size="xs" color="white" />
            <Text fontSize="xs" fontWeight="medium" color="white">
              Edit
            </Text>
          </VStack>
        </Pressable>
        <Pressable
          w="70"
          cursor="pointer"
          bg="red.500"
          justifyContent="center"
          onPress={() => deleteRow(rowMap, data.item._id)}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <VStack alignItems="center" space={2}>
            <Icon
              as={<MaterialIcons name="delete" />}
              color="white"
              size="xs"
            />
            <Text color="white" fontSize="xs" fontWeight="medium">
              Delete
            </Text>
          </VStack>
        </Pressable>
      </HStack>
    );
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        onPress={() =>
          navigation.navigate("Afficher un programme", { data: item })
        }
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
                {item.video}
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
              {item.src}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  useEffect(() => {
    const fetchData = async () => {
      await ProgService.fetchProg()
        .then((result) => setListData(result))
        .catch((e) => console.log("error", e));
    };
    fetchData();
  }, [listData]);

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
            Liste des programmes
          </Heading>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box bg="white" safeArea flex="1">
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
              <Fab
                onPress={() => navigation.navigate("Ajout d'un programme")}
                shadow={2}
                size="md"
                placement="bottom-right"
                bg="#00BFFF"
                icon={
                  <Icon color="white" as={AntDesign} name="plus" size="sm" />
                }
              />
            </Box>
          </ScrollView>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
