import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  Button,
  Icon,
  HStack,
  Input,
  VStack,
  FormControl,
  Center,
} from 'native-base';
import CoachService from '../../services/coach.services';

export default function InvitePlayer() {
  const [mode, setMode] = useState('Basic');
  return (
    <NativeBaseProvider>
      <Center h='100%'>
        <Box
          _dark={{
            bg: 'coolGray.800',
          }}
          _light={{
            bg: 'white',
          }}
          flex='1'
          safeAreaTop
          maxW='400px'
          w='100%'
        >
          <Heading p='4' pb='3' size='lg'>
            Inviter un joueur
          </Heading>
          <InvitationForm />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
function InvitationForm() {
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: 'Le nom est requis' });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: 'Le nom est trop court' });
      return false;
    } else if (formData.surName.length < 3) {
      setErrors({ ...errors, name: 'Le prenom est trop court' });
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    validate()
      ? CoachService.sendInvite({
          nom: formData.name,
          prenom: formData.surName,
          email: formData.email,
          telephone: formData.phone,
        })
          .then((rep) => console.log('resp', rep))
          .catch((e) => console.log('error', e))
      : console.log('Validation Failed');
  };

  return (
    <VStack width='90%' mx='3' maxW='300px'>
      <FormControl isRequired isInvalid={'name' in errors}>
        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          Nom
        </FormControl.Label>
        <Input
          placeholder='kowalski'
          onChangeText={(value) => setData({ ...formData, name: value })}
        />
        {'name' in errors ? (
          <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText>
            Le nom doit contenir au moins 3 caractères.
          </FormControl.HelperText>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={'surName' in errors}>
        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          Prenom
        </FormControl.Label>
        <Input
          placeholder='John'
          onChangeText={(value) => setData({ ...formData, surName: value })}
        />
        {'name' in errors ? (
          <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText>
            Le prenom doit contenir au moins 3 caractères.
          </FormControl.HelperText>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={'name' in errors}>
        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          Email
        </FormControl.Label>
        <Input
          placeholder='John'
          onChangeText={(value) => setData({ ...formData, email: value })}
        />
      </FormControl>

      <FormControl isRequired isInvalid={'name' in errors}>
        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          Telephone
        </FormControl.Label>
        <Input
          placeholder='John'
          onChangeText={(value) => setData({ ...formData, phone: value })}
        />
      </FormControl>
      <Button onPress={onSubmit} mt='5' colorScheme='cyan'>
        Inviter
      </Button>
    </VStack>
  );
}
