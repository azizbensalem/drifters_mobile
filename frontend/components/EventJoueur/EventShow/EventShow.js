import React from "react";
import { Text, Stack } from "native-base";
import { RadioButton } from 'react-native-paper';
import { View } from 'react-native';
export const EventShow = ({ route, navigation }) => {
  const [value, setValue] = React.useState('first');

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
          <Text bold>Date:</Text> {data.date}
        </Text>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View>
        <Text>Interessé</Text>
        <RadioButton value="first" />
      </View>
      <View>
        <Text>Participer</Text>
        <RadioButton value="second" />
      </View>
      <View>
        <Text>Ne pas Participer</Text>
        <RadioButton value="third" />
      </View>
    </RadioButton.Group>
      
      </Stack>
    </Stack>
  );
};
