/* eslint-disable camelcase */

import axios from "axios";

const API_URL = "http://localhost:8080/api/coach/defi/";
const API_URL_Player = "http://localhost:8080/api/joueur/defi/";

const token = localStorage.getItem("user");

const fetchDefi = async () => {
  const result = await axios.get(`${API_URL}${token}`);
  return result.data;
};

const checkDone = async (id) => {
  const result = await axios.get(
    `http://localhost:8080/api/joueur/checkdone/${id}/${token}`
  );
  return result.data;
};

const fetchMesDefi = async () => {
  const result = await axios.get(`${API_URL_Player}${token}`);
  return result.data;
};

const postDefi = async (nom, objectif, lien, periode, joueurs) => {
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
  const result = await axios.put(
    `http://localhost:8080/api/joueur/defidone/${id}/${token}`
  );
  return result.data;
};

const deleteDefi = async (id) => {
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
