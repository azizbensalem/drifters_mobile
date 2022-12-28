import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = "http://192.168.137.1:8080/api/statistique/";

export const addNewStatistique = async (statistique) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.post(url + token, statistique);
  return result.data;
};
export const fetchStatistiques = async () => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.get(url + token);
  return result.data;
};

export const fetchStatistique = async (id) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.get(`${url}${id}/${token}`);
  return result.data;
};

export const removeStatistique = async (id) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.delete(`${url}${id}/${token}`);
  return result.data;
};

export const modifyStatistique = async ({
  id,
  nom,
  description,
  type,
  unite,
  objectif,
  lien,
  visible,
}) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.put(`${url}${id}/${token}`, {
    id,
    nom,
    description,
    type,
    unite,
    objectif,
    lien,
    visible,
  });
  return result.data;
};
