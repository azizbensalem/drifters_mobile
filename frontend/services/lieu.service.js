import axios from "axios";

const API_URL = "http://localhost:8080/api/coach/lieu/";

const token = localStorage.getItem("user");

const fetchLieux = async () => {
  const result = await axios.get(`${API_URL}${token}`);
  return result.data;
};

const fetchAllLieux = async () => {
  const result = await axios.get(`${API_URL}`);
  return result.data;
};

const postLieu = async (lieu) => {
  const result = await axios.post(API_URL + token, lieu);
  return result.data;
};

const updateLieu = async (id, nom, ville, pays, adresse) => {
  const result = await axios.put(`${API_URL}${id}/${token}`, {
    nom,
    ville,
    pays,
    adresse,
  });
  return result.data;
};

const deleteLieu = async (id) => {
  const result = await axios.delete(`${API_URL}${id}/${token}`);
  return result.data;
};

const LieuService = {
  fetchLieux,
  postLieu,
  updateLieu,
  deleteLieu,
  fetchAllLieux,
};

export default LieuService;
