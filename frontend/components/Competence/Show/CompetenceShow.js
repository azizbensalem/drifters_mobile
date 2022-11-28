import React from "react";
import { Text, Stack } from "native-base";

export const CompetenceShow = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <Stack my="10">
      <Stack mx="10" my="2">
        <Text py="1" fontSize={17}>
          <Text bold>Nom: </Text>
          {data.name}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Description: </Text> {data.description}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Étoiles: </Text> {data.stars}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Lien: </Text> {data.link}
        </Text>
      </Stack>
    </Stack>
  );
};
