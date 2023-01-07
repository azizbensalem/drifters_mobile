import React from "react";
import { Text, Stack } from "native-base";

export const StatShow = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <Stack my="10">
      <Stack mx="10" my="2">
        <Text py="1" fontSize={17}>
          <Text bold>Nom: </Text>
          {data.nom}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Description:</Text> {data.description}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Type:</Text> {data.type}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Unite:</Text> {data.unite}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Unite:</Text> {data.unite}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Objectif:</Text> {data.objectif}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Visible:</Text> {data.visible}
        </Text>
      </Stack>
    </Stack>
  );
};
