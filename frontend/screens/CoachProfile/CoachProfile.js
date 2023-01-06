import React, { useContext, useEffect, useState } from "react";
import { ProfileUpdateForm } from "../../components/ProfileUpdateForm/ProfileUpdateForm";
import { AuthContext } from "../../context/AuthContext";

export default function CoachProfile({ navigation }) {
  const { data } = useContext(AuthContext);

  return <ProfileUpdateForm user={data} />;
}
