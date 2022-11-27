import axios from "axios";

const url = "http://localhost:8080/api/competence/";
const token = localStorage.getItem("user");

export const addCompetence = async (competence) => {
  const result = await axios.post(url + token, competence);
  return result.data;
};
export const fetchCompetences = async () => {
  const result = await axios.get(url + token);
  return result.data;
};

export const fetchCompetence = async (id) => {
  const result = await axios.get(`${url}${id}/${token}`);
  return result.data;
};

export const removeCompetence = async (id) => {
  const result = await axios.delete(`${url}${id}/${token}`);
  return result.data;
};

export const modifyCompetence = async ({
  id,
  name,
  description,
  link,
  visible,
  stars,
}) => {
  const result = await axios.put(`${url}${id}/${token}`, {
    id,
    name,
    description,
    link,
    visible,
    stars,
  });
  return result.data;
};
