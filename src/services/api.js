import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

let refresh = false;



export default api;
