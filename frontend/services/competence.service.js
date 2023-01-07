import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const url = 'http://192.168.1.157:8080/api/competence/';


export const addCompetence = async (competence) => {
  AsyncStorage.getItem('@user').then(async (token) => {
    const result = await axios.post(url + token, competence);
    return result.data;
  });
};
export const fetchCompetences = async () => {
  const token = await AsyncStorage.getItem('@user');
  const result = await axios.get(url + token);

  return result.data;
};

export const fetchCompetence = async (id) => {
  AsyncStorage.getItem('@user').then(async (token) => {
    const result = await axios.get(`${url}${id}/${token}`);

    return result.data;
  });
};

export const removeCompetence = async (id) => {
  AsyncStorage.getItem('@user').then(async (token) => {
    const result = await axios.delete(`${url}${id}/${token}`);

    return result.data;
  });
};

export const modifyCompetence = async ({
  id,
  name,
  description,
  link,
  stars,
}) => {
  console.log('Mod called');
  AsyncStorage.getItem('@user').then(async (token) => {
    console.log('>>>>>>>Mod called', id, name, description, link, stars);

    const result = await axios.put(`${url}${id}/${token}`, {
      name,
      description,
      link,
      visible: true,
      stars,
    });

    return result.data;
  });
};
