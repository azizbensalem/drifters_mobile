import axios from "axios";

const API_URL = "http://localhost:8080/api/coach/programme/";

const token = localStorage.getItem("user");

const fetchProg = async () => {
  const result = await axios.get(`${API_URL}${token}`);
  console.log("fetched data = ", result);
  return result.data;
};

const fetchProgList = async () => {
  const result = await axios.get(`${API_URL}`);
  return result.data;
};

const postProg = async (Prog) => {
  console.log("added data= ", Prog);
  const result = await axios.post(API_URL + token, Prog);
  console.log("added result = ", result);
  return result.data;
};

const updateProg = async (id, title, description, src, video) => {
  const result = await axios.put(`${API_URL}${id}/${token}`, {
    title,
    description,
    src,
    video,
  });
  return result.data;
};

const deleteProg = async (id) => {
  const result = await axios.delete(`${API_URL}${id}/${token}`);
  return result.data;
};

const ProgService = {
  fetchProg,
  postProg,
  updateProg,
  deleteProg,
  fetchProgList,
};

export default ProgService;
