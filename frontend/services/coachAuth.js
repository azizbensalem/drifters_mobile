import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JwtDecode from "jwt-decode";

const API_URL = "http://192.168.137.1:8080/api/coach/";

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
        AsyncStorage.setItem("@user", response.data.data.token);
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
        AsyncStorage.setItem("@user", response.data.data.token);
      }
      return response.data;
    });

const logout = () => {
  AsyncStorage.removeItem("@user");
};

const getCurrentUser = async () => {
  const token = await AsyncStorage.getItem("@user");
  const result = await axios.get(`${API_URL}profile/${token}`);
  return result.data;
};

const authVerify = () => {
  AsyncStorage.getItem("@user").then((user) => {
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
  });
  return 0;
};

export const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  authVerify,
};
