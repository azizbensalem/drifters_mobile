import React from "react";
import { Text, Stack } from "native-base";

export const ProgShow = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <Stack my="10">
      <Stack mx="10" my="2">
        <Text py="1" fontSize={17}>
          <Text bold>Titre: </Text>
          {data.title}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Description:</Text> {data.description}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Src:</Text> {data.src}
        </Text>
        <Text py="1" fontSize={17}>
          <Text bold>Vidéo:</Text> {data.video}
        </Text>
      </Stack>
    </Stack>
  );
};
