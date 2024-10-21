// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Certifique-se de que esta é a URL correta do backend
});

// Interceptor para adicionar o token nas requisições
api.interceptors.request.use(
  (config) => {
    //const token = localStorage.getItem('token');
    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTI5M2Q4MTljMGRkZWQ0MTA3ZGI5OCIsImlhdCI6MTcyOTQ2OTQ2Mn0.tPFnz4YVS7sAvB2aPeDxgGy-8rOizG3eEKHsGecwgOU";
    console.log(token,"token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
