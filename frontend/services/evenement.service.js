/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable no-promise-executor-return */
/* eslint-disable import/prefer-default-export */
import axios from "axios";

const API_URL = "http://localhost:8080/api/coach/evenement/";
const API_URL_Player = "http://localhost:8080/api/joueur/evenement/";

const token = localStorage.getItem("user");

const events = [
  // {
  //     id:1,
  //     Nom : "event1",
  //     Description :"event 200 metres",
  //     date:  "12/12/2002",
  //     Public : " public",
  //     Lieu : "parc",
  //     Createdby:"Coach AHMED",
  //     participants :["Wejdene Touhami", "Karama Aissaoui"]
  // },
  // {
  //     id:2,
  //     Nom : "event1",
  //     Description :"event 200 metres",
  //     date:  "12/12/2002",
  //     Public : " public",
  //     Lieu : "parc",
  //     Createdby:"Coach B",
  //     participants :["Wejdene Touhami", "Karama Aissaoui"]
  // },
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchEventById = async (eventId) => {
  await delay(2000);
  return events.find((event) => event.id == eventId);
};

const fetchEvent = async () => {
  const result = await axios.get(`${API_URL}${token}`);
  return result.data;
};
const fetchMesEvent = async () => {
  const result = await axios.get(`${API_URL_Player}${token}`);
  console.log(result.data);
  return result.data;
};

const postEvent = async (event) => {
  const result = await axios.post(API_URL + token, event);
  return result.data;
};

const updateEvent = async (id, nom, description, date, lieu) => {
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
