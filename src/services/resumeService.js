import httpClient from './httpClient';

// Função que consome o endpoint
export const getResumo = async () => {
  const response = await httpClient.get('/resumo');
  return response.data;
};
