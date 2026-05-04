import axios from "axios";

const API = axios.create({
  baseURL: "task-manager-production-66e0.up.railway.app"
});

export default API;