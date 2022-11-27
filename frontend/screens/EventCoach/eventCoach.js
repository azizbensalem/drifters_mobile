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
  Stack,
  Button
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { EventForm } from "../../components/Event/eventForm";





export default function EventCoach() {
  const [mode, setMode] = useState("Basic");
  return (
    <NativeBaseProvider>
      <Center h="100%">
        <Box
          _dark={{
            bg: "coolGray.800",
          }}ss
          _light={{
            bg: "white",
          }}
          flex="1"
          safeAreaTop
          maxW="400px"
          w="100%"
        >
          <Heading p="4" pb="3" size="lg">
            Liste des évenements
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
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullname: "event1",
      timeStamp: "12:47 PM",
      recentText: "100 mètres!",
      avatarUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullname: "event 2",
      timeStamp: "11:11 PM",
      recentText: "Lancer du poids !",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
   
   
  ];
  const [listData, setListData] = useState(data);

  function addRow (fullname ,timeStamp,recentText,avatarUrl){
    setListData([...listData, { id:listData.length +1, fullname ,timeStamp,recentText,avatarUrl}])
}

function updateRow (id,fullName,timeStamp,recentText,avatarUrl ){
    const  newData = listData.map((data) => 
    data.id === id ? {id,fullname ,timeStamp,recentText,avatarUrl} : data
    )
  setListData(newData)
 }

  const deleteRow = (id) => {
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === id);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };
  
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        onPress={() => console.log("You touched me")}
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
                {item.key}
              </Text>
              <Text
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {item.fullname}
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
              {item.timeStamp}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, id) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={updateRow}
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
          update
          </Text>
         
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={deleteRow}
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
    <EventForm addRow={addRow}/>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen} />
     
    </Box>
    
  );
}
