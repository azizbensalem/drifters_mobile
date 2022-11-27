import axios from "axios";

const API_URL = "http://localhost:8080/api/joueur/";

const register = (
  nom,
  prenom,
  dateDeNaissance,
  lieuDeNaissance,
  sexe,
  email,
  password,
  occupation,
  typeEtablissement,
  ville,
  telephone,
  token
) =>
  axios
    .post(`${API_URL}register/${token}`, {
      nom,
      prenom,
      dateDeNaissance,
      lieuDeNaissance,
      sexe,
      email,
      password,
      occupation,
      typeEtablissement,
      ville,
      telephone,
    })
    .then((response) => {
      if (typeof response.data.data !== "undefined") {
        localStorage.setItem("user", response.data.data.token);
      }
      console.log("token: ", token);
      return response.data;
    });

const login = (email, password) =>
  axios
    .post(`${API_URL}login`, {
      email,
      password,
    })
    .then((response) => {
      if (typeof response.data.data !== "undefined") {
        localStorage.setItem("user", response.data.data.token);
      }
      return response.data;
    });

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = async () => {
  const token = localStorage.getItem("user");
  console.log(token);
  const result = await axios.get(`${API_URL}profile/${token}`);
  return result.data;
};

const updateProfile = async (
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
  etat,
  typeEtablissement
) => {
  const token = localStorage.getItem("user");

  const result = await axios.put(`${API_URL}/profile/edit/${token}`, {
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
    etat,
    typeEtablissement,
  });
  return result.data;
};

const JoueurAuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
};

export default JoueurAuthService;
