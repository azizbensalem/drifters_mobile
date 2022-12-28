import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.137.1:8080/api/coach/evenement/";
const API_URL_Player = "http://192.168.137.1:8080/api/joueur/evenement/";

const token = await AsyncStorage.getItem("@user");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchEventById = async (eventId) => {
  await delay(2000);
  return events.find((event) => event.id == eventId);
};

const fetchEvent = async () => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.get(`${API_URL}${token}`);
  return result.data;
};
const fetchMesEvent = async () => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.get(`${API_URL_Player}${token}`);
  console.log(result.data);
  return result.data;
};

const postEvent = async (event) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.post(API_URL + token, event);
  return result.data;
};

const updateEvent = async (id, nom, description, date, lieu) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.put(`${API_URL}${id}/${token}`, {
    id,
    nom,
    description,
    date,
    lieu,
  });
  return result.data;
};

const deleteEvent = async (id) => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.delete(`${API_URL}${id}/${token}`);
  return result.data;
};

const eventService = {
  fetchEvent,
  postEvent,
  updateEvent,
  deleteEvent,
  fetchMesEvent,
};

export default eventService;
