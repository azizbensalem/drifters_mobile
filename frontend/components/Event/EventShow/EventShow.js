import React from "react";
import { Text, Stack } from "native-base";

export const EventShow = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <Stack my="10">
      <Stack mx="10" my="2">
        <Text py="1" fontSize={17}>
          <Text bold>Nom: </Text>
          {data.nom}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Description:</Text> {data.objectif}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Date:</Text> {data.lien}
        </Text>
      </Stack>
    </Stack>
  );
};
