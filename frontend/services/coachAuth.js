import axios from "axios";

import JwtDecode from "jwt-decode";

const API_URL = "http://localhost:8080/api/coach/";

const register = (
  email,
  password,
  nom,
  prenom,
  dateDeNaissance,
  photoDeProfil
) =>
  axios
    .post(`${API_URL}register`, {
      email,
      password,
      nom,
      prenom,
      dateDeNaissance,
      photoDeProfil,
    })
    .then((response) => {
      if (typeof response.data.data !== "undefined") {
        localStorage.setItem("user", response.data.data.token);
      }
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
  const result = await axios.get(`${API_URL}profile/${token}`);
  return result.data;
};

const authVerify = () => {
  const user = localStorage.getItem("user");
  if (user) {
    if (JwtDecode(user).exp * 1000 < Date.now()) {
      localStorage.clear();
      return 0;
    }
    if (JwtDecode(user).role === "Coach") {
      return 1;
    }
    if (JwtDecode(user).role === "Joueur") {
      return 2;
    }
  }
  return 0;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  authVerify,
};

export default AuthService;
