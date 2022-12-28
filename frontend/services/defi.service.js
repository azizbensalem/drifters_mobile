import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.137.1:8080/api/coach/defi/";
const API_URL_Player = "http://192.168.137.1:8080/api/joueur/defi/";

const fetchDefi = async () => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.get(`${API_URL}${token}`);
  return result.data;
};

const checkDone = async (id) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.get(
    `http://192.168.137.1:8080/api/joueur/checkdone/${id}/${token}`
  );
  return result.data;
};

const fetchMesDefi = async () => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.get(`${API_URL_Player}${token}`);
  return result.data;
};

const postDefi = async (nom, objectif, lien, periode, joueurs) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.post(
    API_URL + token,
    nom,
    objectif,
    lien,
    periode,
    joueurs
  );
  return result.data;
};

const updateDefi = async (id, nom, objectif, lien, periode, joueurs) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.put(`${API_URL}${id}/${token}`, {
    nom,
    objectif,
    lien,
    periode,
    joueurs,
  });
  return result.data;
};

const defiDone = async (id) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.put(
    `http://localhost:8080/api/joueur/defidone/${id}/${token}`
  );
  return result.data;
};

const deleteDefi = async (id) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.delete(`${API_URL}${id}/${token}`);
  return result.data;
};

const defiService = {
  fetchDefi,
  postDefi,
  updateDefi,
  deleteDefi,
  fetchMesDefi,
  defiDone,
  checkDone,
};

export default defiService;
