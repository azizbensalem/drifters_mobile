import React from "react";
import { Text, Stack } from "native-base";

export const DefiShow = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <Stack my="10">
      <Stack mx="10" my="2">
        <Text py="1" fontSize={17}>
          <Text bold>Nom: </Text>
          {data.nom}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Objectif:</Text> {data.objectif}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Lien:</Text> {data.lien}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Période:</Text> {data.periode}
        </Text>
      </Stack>
    </Stack>
  );
};
