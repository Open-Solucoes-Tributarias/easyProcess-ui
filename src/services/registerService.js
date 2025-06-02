import httpClient from './httpClient';

// Função para fazer o cadastro (registro)
export const register = async (data) => {
  const response = await httpClient.post('/api/Auth/register', data);
  return response.data;
};
