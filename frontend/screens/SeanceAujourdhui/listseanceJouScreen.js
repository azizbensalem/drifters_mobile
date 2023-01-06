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
import SeanceService from "../../services/seance.service";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

export default function ListSeanceJouScreen({ navigation }) {
  const [list, setList] = useState("");

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    EventService.deleteEvent(rowKey);
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HStack flex="1" pl="2">
        
      </HStack>
    );
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        onPress={() => navigation.navigate("Afficher une Séance", { data: item })}
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
                {item.nom}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.periode}
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
              {item.date}
            </Text>
            <Text
              fontSize="xs"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              alignSelf="flex-start"
            >
              {item.objectif}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );


  useEffect(() => {
    const fetchData = async () => {
      await SeanceService.fetchSeanceToday
        .then((results) => setList(results))
        .catch((e) => console.log("error", e));
    };
    fetchData();
  }, [list]);
  
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
            Liste des Séances Aujourd'hui
          </Heading>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box bg="white" safeArea flex="1">
              <SwipeListView
                data={list}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-130}
                previewRowKey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
              />
            </Box>
          </ScrollView>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
