import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { styles } from './style';
import {
  Alert,
  FormControl,
  Input,
  Stack,
  VStack,
  HStack,
  Center,
} from 'native-base';
import { addCompetence } from '../../../services/competence.service';

export const CompetenceForm = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState('');

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        link: '',
        stars: '',
        visible: true,
      }}
      onSubmit={(values) => {
        addCompetence(values).then((rep) => console.log(rep));
        setTimeout(() => {
          navigation.goBack();
        }, 100);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Stack my='10'>
          <FormControl isRequired>
            <Stack mx='10' my='2'>
              <FormControl.Label>Nom</FormControl.Label>
              <Input
                name='name'
                placeholder='Nom du Competence'
                style={styles.textInput}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                keyboardType='name'
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx='10' my='2'>
              <FormControl.Label>description</FormControl.Label>
              <Input
                name='description'
                placeholder='description'
                style={styles.textInput}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                keyboardType='description'
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx='10' my='2'>
              <FormControl.Label>Lien</FormControl.Label>
              <Input
                name='link'
                placeholder='Lien'
                style={styles.textInput}
                onChangeText={handleChange('link')}
                onBlur={handleBlur('link')}
                value={values.link}
                keyboardType='link'
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx='10' my='2'>
              <FormControl.Label>Étoiles</FormControl.Label>
              <Input
                name='stars'
                placeholder='0'
                style={styles.textInput}
                onChangeText={handleChange('stars')}
                onBlur={handleBlur('stars')}
                value={values.stars}
                keyboardType='stars'
              />
            </Stack>
          </FormControl>

          <Center>
            <TouchableOpacity style={styles.loginBtn}>
              <Text onPress={handleSubmit} style={styles.loginText}>
                Ajouter competence
              </Text>
            </TouchableOpacity>
          </Center>
        </Stack>
      )}
    </Formik>
  );
};
