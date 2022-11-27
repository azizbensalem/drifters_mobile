import axios from "axios";

const url = "http://localhost:8080/api/statistique/";
const token = localStorage.getItem("user");

export const addNewStatistique = async (statistique) => {
  const result = await axios.post(url + token, statistique);
  return result.data;
};
export const fetchStatistiques = async () => {
  const result = await axios.get(url + token);
  return result.data;
};

export const fetchStatistique = async (id) => {
  const result = await axios.get(`${url}${id}/${token}`);
  return result.data;
};

export const removeStatistique = async (id) => {
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
