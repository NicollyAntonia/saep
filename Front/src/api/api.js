import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true, // 🔥 OBRIGATÓRIO!
  headers: {
    "Content-Type": "application/json",
  },
});


// 🔥 ADICIONAR O TOKEN EM TODAS AS REQUISIÇÕES
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
