import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://192.168.56.1:8080/api/coach/lieu/";

const fetchLieux = async () => {
  AsyncStorage.getItem("@user").then(async (token) => {
    const result = await axios.get(`${API_URL}${token}`);
    return result;
  });
};

const fetchAllLieux = async () => {
  const result = await axios.get(`${API_URL}`);
  return result.data;
};

const postLieu = async (lieu) => {
  AsyncStorage.getItem("@user").then(async (token) => {
    const result = await axios.post(API_URL + token, lieu);
    return result.data;
  });
};

const updateLieu = async (id, nom, ville, pays, adresse) => {
  AsyncStorage.getItem("@user").then(async (token) => {
    const result = await axios.put(`${API_URL}${id}/${token}`, {
      nom,
      ville,
      pays,
      adresse,
    });
    return result.data;
  });
};

const deleteLieu = async (id) => {
  AsyncStorage.getItem("@user").then(async (token) => {
    const result = await axios.delete(`${API_URL}${id}/${token}`);
    console.log(id);
    return result.data;
  });
};

const LieuService = {
  fetchLieux,
  postLieu,
  updateLieu,
  deleteLieu,
  fetchAllLieux,
};

export default LieuService;
