import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Cria instância do axios
const httpClient = axios.create({
  baseURL: apiUrl,
});

// Interceptador de requisição: adiciona token se existir
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptador de resposta: trata erros 401
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default httpClient;
