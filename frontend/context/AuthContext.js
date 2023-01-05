import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/coachAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const login = (email, password) => {
    AuthService.login(email, password)
      .then((e) => {
        setSuccess(true);
        setMsg("Authentification effectuée avec succès");
        setTimeout(() => {
          setUserToken(e.data.token);
        }, 500);
      })
      .catch((e) => {
        const resMessage =
          (e.response && e.response.data && e.response.data.msg) ||
          e.message ||
          e.toString();

        setError(true);
        setMsg(resMessage);
      });
  };

  const logout = () => {
    setUserToken(null);
    setSuccess(false);
    setError(false);
    AuthService.logout();
  };

  const isLoggedIn = async () => {
    try {
      let userToken = await AsyncStorage.getItem("@user");
      setUserToken(userToken);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, userToken, success, msg, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
