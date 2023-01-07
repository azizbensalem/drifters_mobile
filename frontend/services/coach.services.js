import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import JwtDecode from "jwt-decode";


const API_URL = 'http://192.168.1.157:8080/api/coach/';


const updateCoach = async (nom, prenom, dateDeNaissance) => {
  const token = await AsyncStorage.getItem('@user');

  const result = await axios.put(`${API_URL}profile/edit/${token}`, {
    nom,
    prenom,
    dateDeNaissance,
  });
  return result.data;
};

const updateAbonnement = async (abonnement) => {
  const token = await AsyncStorage.getItem('@user');
  const result = await axios.put(`${API_URL}payement/${token}`, {
    abonnement,
  });
  return result.data;
};

const firstLogin = async (accessToken, discipline) => {
  console.log(accessToken);
  const result = await axios.put(`${API_URL}firstlogin/${accessToken.token}`, {
    discipline,
  });
  return result.data;
};

const fetchJoueurs = async () => {
  const token = await AsyncStorage.getItem('@user');
  const result = await axios.get(`${API_URL}playerslist/${token}`);
  return result.data;
};

const updatePlayer = async (
  id,
  nom,
  prenom,
  email,
  dateDeNaissance,
  lieuDeNaissance,
  telephone,
  sexe,
  poids,
  taille,
  main,
  ville,
  prixSeance,
  etat,
  typeEtablissement
) => {
  const token = await AsyncStorage.getItem('@user');
  const result = await axios.put(`${API_URL}editPlayer/${id}/${token}`, {
    id,
    nom,
    prenom,
    email,
    dateDeNaissance,
    lieuDeNaissance,
    telephone,
    sexe,
    poids,
    taille,
    main,
    ville,
    prixSeance,
    etat,
    typeEtablissement,
  });
  return result.data;
};

const sendInvite = async ({ email, nom, prenom, telephone }) => {
  const token = await AsyncStorage.getItem('@user');
  const result = await axios.post(`${API_URL}inviter/joueur/${token}`, {
    email,
    nom,
    prenom,
    telephone,
  });
  return result.data;
};

const deletePlayer = async (id) => {
  const token = await AsyncStorage.getItem('@user');
  const result = await axios.delete(`${API_URL}deletePlayer/${id}/${token}`);
  return result.data;
};

const CoachService = {
  updateCoach,
  updateAbonnement,
  fetchJoueurs,
  firstLogin,
  updatePlayer,
  deletePlayer,
  sendInvite,
};

export default CoachService;
