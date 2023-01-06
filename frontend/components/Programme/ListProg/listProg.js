import React from "react";
import { Box, Text, Pressable, HStack, VStack, Spacer } from "native-base";

export const renderItem = ({ item, index, navigation }) => (
  <Box>
    <Pressable
      onPress={() => navigation.navigate("Ajout d'un programme")}
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
