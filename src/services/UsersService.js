import httpClient from './httpClient';

// Função que consome o endpoint
export const getUsers= async () => {
  const response = await httpClient.get('/api/usuarios');
  return response.data;
};

//adicionar usuarios
export const registerUser = async (data) => {
  const response = await httpClient.post('/api/usuarios', data);
  return response.data;
};


