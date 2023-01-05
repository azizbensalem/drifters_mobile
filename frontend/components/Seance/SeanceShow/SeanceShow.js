import React from "react";
import { Text, Stack } from "native-base";

export const SeanceShow = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <Stack my="10">
      <Stack mx="10" my="2">
        <Text py="1" fontSize={17}>
          <Text bold>Nom: </Text>
          {data.nom}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>periode:</Text> 
          {data.date}
        </Text>
      </Stack>
    </Stack>
  );
};
