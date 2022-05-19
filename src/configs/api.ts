import axios from 'axios'

// const BACKEND_URL = "http://localhost:8000/api";
const BACKEND_URL = "/api";

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api