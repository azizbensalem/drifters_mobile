import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/coachAuth";
import JoueurAuthService from "../services/joueurAuth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [abonnement, setAbonnement] = useState("");
  const [data, setData] = useState({});

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

  const loginPlayer = (email, password) => {
    JoueurAuthService.login(email, password)
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

  const getUser = () => {
    AuthService.getCurrentUser()
      .then((u) => {
        console.log("data", u);
        setAbonnement(u.abonnement);
        setData(u);
      })
      .catch((e) => console.log("error", e));
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
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        loginPlayer,
        logout,
        getUser,
        userToken,
        success,
        msg,
        error,
        abonnement,
        data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
