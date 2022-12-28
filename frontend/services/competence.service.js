import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = "http://192.168.137.1:8080/api/competence/";

export const addCompetence = async (competence) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.post(url + token, competence);
  return result.data;
};

export const fetchCompetences = async () => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.get(url + token);
  return result.data;
};

export const fetchCompetence = async (id) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.get(`${url}${id}/${token}`);
  return result.data;
};

export const removeCompetence = async (id) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.delete(`${url}${id}/${token}`);
  return result.data;
};

export const modifyCompetence = async ({
  id,
  name,
  description,
  link,
  visible,
  stars,
}) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.put(`${url}${id}/${token}`, {
    id,
    name,
    description,
    link,
    visible,
    stars,
  });
  return result.data;
};
