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
import { modifyStatistique } from '../../../services/lieu.service';

export const StatUpdateForm = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <Formik
      initialValues={data}
      onSubmit={(values) => {
        console.log(values);
        modifyStatistique({
          id: values._id,
          nom: values.nom,
          ville: values.ville,
          pays: values.pays,
          adresse: values.adresse,
        })
          .then((rep) => console.log('resp', rep))
          .catch((e) => console.log('error', e));
        setTimeout(() => {
          navigation.goBack();
        }, 200);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Stack my='10'>
          <FormControl isRequired>
            <Stack mx='10' my='2'>
              <FormControl.Label>Nom</FormControl.Label>
              <Input
                name='nom'
                placeholder='Nom du statistique'
                style={styles.textInput}
                onChangeText={handleChange('nom')}
                onBlur={handleBlur('nom')}
                value={values.nom}
                keyboardType='nom'
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx='10' my='2'>
              <FormControl.Label>Description</FormControl.Label>
              <Input
                name='description'
                placeholder='Description'
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
              <FormControl.Label>Type</FormControl.Label>
              <Input
                name='type'
                placeholder='Type'
                style={styles.textInput}
                onChangeText={handleChange('type')}
                onBlur={handleBlur('type')}
                value={values.type}
                keyboardType='type'
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx='10' my='2'>
              <FormControl.Label>Unite</FormControl.Label>
              <Input
                name='unite'
                placeholder='Unite'
                style={styles.textInput}
                onChangeText={handleChange('unite')}
                onBlur={handleBlur('unite')}
                value={values.unite}
                keyboardType='unite'
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx='10' my='2'>
              <FormControl.Label>Objectif</FormControl.Label>
              <Input
                name='objectif'
                placeholder='Objectif'
                style={styles.textInput}
                onChangeText={handleChange('objectif')}
                onBlur={handleBlur('objectif')}
                value={values.objectif}
                keyboardType='objectif'
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx='10' my='2'>
              <FormControl.Label>Lien</FormControl.Label>
              <Input
                name='lien'
                placeholder='Lien'
                style={styles.textInput}
                onChangeText={handleChange('lien')}
                onBlur={handleBlur('lien')}
                value={values.lien}
                keyboardType='lien'
              />
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <Stack mx='10' my='2'>
              <FormControl.Label>Visible</FormControl.Label>
              <Input
                name='visible'
                placeholder='Visible'
                style={styles.textInput}
                onChangeText={handleChange('visible')}
                onBlur={handleBlur('visible')}
                value={values.visible}
                keyboardType='visible'
              />
            </Stack>
          </FormControl>

          <Center>
            <TouchableOpacity style={styles.loginBtn}>
              <Text onPress={handleSubmit} style={styles.loginText}>
                EDIT
              </Text>
            </TouchableOpacity>
          </Center>
        </Stack>
      )}
    </Formik>
  );
};
