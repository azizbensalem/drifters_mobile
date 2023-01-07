import React, { useState,useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { Formik } from "formik";
import { styles } from "./style";
import {
  Alert,
  FormControl,
  Input,
  Stack,
  VStack,
  HStack,
  Center,
  Select,
  View
} from "native-base";

import SeanceService from "../../../services/seance.service";
import LieuService from "../../../services/lieu.service";

export const SeanceForm = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [lieu, setlieu] = useState([]);
  const [lieuList, setLieuList] = useState([]);
  const [dateSeance, setDateSeance] = useState("");


  return (
    
    <Formik
      initialValues={{ nom: "", periode: "" , date:"", objectif:""}}
      onSubmit={(values) => {
        SeanceService.postSeance(values).then((rep) => console.log(rep));
        setTimeout(() => {
          navigation.goBack();
        }, 100);
      }}
    >
      
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Stack my="10">
          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Nom</FormControl.Label>
              <Input
                name="nom"
                placeholder="Nom de la Séance "
                style={styles.textInput}
                onChangeText={handleChange("nom")}
                onBlur={handleBlur("nom")}
                value={values.nom}
                keyboardType="nom"
              />
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <Stack mx="10" my="2">
              <FormControl.Label>Periode</FormControl.Label>
              <Input
                name="periode"
                placeholder="periode"
                style={styles.textInput}
                onChangeText={handleChange("periode")}
                onBlur={handleBlur("periode")}
                value={values.periode}
                keyboardType="periode"
              />
            </Stack>
          </FormControl>
          <FormControl isRequired>
          <Stack mx="10" my="2">
              <FormControl.Label>Date</FormControl.Label>
              <Input
                name="date"
                placeholder="date"
                style={styles.textInput}
                onChangeText={handleChange("date")}
                onBlur={handleBlur("date")}
                value={values.date}
                keyboardType="date"
              />
            </Stack>
          </FormControl>
          <FormControl isRequired>
          <Stack mx="10" my="2">
              <FormControl.Label>Objectif</FormControl.Label>
              <Input
                name="objectif"
                placeholder="objectif"
                style={styles.textInput}
                onChangeText={handleChange("objectif")}
                onBlur={handleBlur("objectif")}
                value={values.objectif}
                keyboardType="objectif"
              />
            </Stack>
          </FormControl>
          <FormControl >
          <FormControl.Label>les Joueurs</FormControl.Label>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Wejdene Touhami ', value: 'Wejdene Touhami' },
                { label: 'ISAMM Manouba', value: 'ISAMM Manouba' },
                { label: 'test1', value: 'test1' },
            ]}
            
        />
      
          </FormControl>
          <FormControl >
          <FormControl.Label>les Lieux</FormControl.Label>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Cathédrale de Saint-Louis', value: 'Cathédrale de Saint-Louis' },
                { label: 'Colline de Byrsa', value: 'Colline de Byrsa' },
                { label: 'PLage de Rafraf', value: 'PLage de Rafraf' },
                { label: 'ISAMM', value: 'ISAMM' },
            ]}
            
        />
          </FormControl>

          <Center>
            <TouchableOpacity style={styles.loginBtn}>
              <Text onPress={handleSubmit} style={styles.loginText}>
                AJOUTER
              </Text>
            </TouchableOpacity>
          </Center>
        </Stack>
      )}
    </Formik>
  );
};
