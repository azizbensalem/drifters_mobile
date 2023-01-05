import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ProfileUpdateForm } from "../../components/ProfileUpdateForm/ProfileUpdateForm";
import { AuthService } from "../../services/coachAuth";

export default function CoachProfile({ navigation }) {
  const [data, setData] = useState("");

  useEffect(() => {
    AuthService.getCurrentUser()
      .then((e) => setData(e))
      .catch((e) => console.log(e));
  }, [data]);

  return <ProfileUpdateForm user={data} />;
}
