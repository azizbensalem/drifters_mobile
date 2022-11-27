/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import axios from "axios";

const API_URL = "http://localhost:8080/api/coach/seance/";
const API_URL_Player = "http://localhost:8080/api/joueur/seance/";

const token = localStorage.getItem("user");

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const fetchSeance = async () => {
  const result = await axios.get(`${API_URL}${token}`);
  return result.data;
};

export const annulerSeance = async (id, annuler, raisonAnnuler) => {
  const result = await axios.put(`${API_URL}annulerSeance/${id}/${token}`, {
    annuler,
    raisonAnnuler,
  });
  return result.data;
};

export const feedbackSeance = async (id, objectifAtteint, feedback) => {
  const result = await axios.put(`${API_URL}feedbackSeance/${id}/${token}`, {
    objectifAtteint,
    feedback,
  });
  return result.data;
};

export const postSeance = async (
  nom,
  date,
  periode,
  lieu,
  joueur,
  programme
) => {
  const result = await axios.post(
    API_URL + token,
    nom,
    date,
    periode,
    lieu,
    joueur,
    programme
  );
  return result.data;
};

export const updateSeance = async (
  id,
  nom,
  date,
  periode,
  lieu,
  joueur,
  programme
) => {
  const result = await axios.put(`${API_URL}${id}/${token}`, {
    nom,
    date,
    periode,
    lieu,
    joueur,
    programme,
  });
  return result.data;
};

export const fetchSeances = async (searchValue) => {
  const result = await axios.get(`${API_URL}${token}`);
  return result.data.filter((seance) => seance.periode.includes(searchValue));
};

export const fetchSeanceToday = async () => {
  await delay(2000);
  const result = await axios.get(`${API_URL_Player}${token}`);
  const today = new Date();
  const month =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  const seanceDate = `${today.getFullYear()}-${month}-${today.getDate()}`;
  return result.data.filter((seance) => seance.date.includes(seanceDate));
};

export const fetchSeanceByFields = async (
  seanceNom,
  seanceDate,
  seancePeriode
) => {
  await delay(2000);
  const result = await axios.get(`${API_URL_Player}${token}`);
  return result.data.filter(
    (seance) =>
      seance.nom.includes(seanceNom) &&
      seance.date.includes(seanceDate) &&
      seance.periode.includes(seancePeriode)
  );
};
