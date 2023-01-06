import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.70.210:8080/api/coach/seance/";
const API_URL_Player = "http://192.168.70.210:8080/api/joueur/seance/";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const fetchSeance = async () => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.get(`${API_URL}${token}`);
  return result.data;
};


const postSeance = async (seance) => {
  AsyncStorage.getItem("@user").then(async (token) => {
   const result = await axios.post(API_URL + token, seance);
    return result.data;
  });
};

const fetchSeances = async (searchValue) => {
  const token = await AsyncStorage.getItem("@user");
  const results = await axios.get(`${API_URL}${token}`);
  return results.data.filter((seance) => seance.periode.includes(searchValue));
};
 const fetchSeanceToday = async () => {
  await delay(2000);
  const result = await axios.get(`${API_URL}${token}`);
  const today = new Date();
  const month =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  const seanceDate = `${today.getFullYear()}-${month}-${today.getDate()}`;
  return result.data.filter((seance) => seance.date.includes(seanceDate));
};

 const fetchSeanceByFields = async (
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
const SeanceService = {
  fetchSeance,
  postSeance,
  fetchSeanceByFields,
  fetchSeanceToday,
  fetchSeances,
}

export default SeanceService;
