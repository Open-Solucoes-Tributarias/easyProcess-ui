import httpClient from './httpClient';

// GET
export const getMovimentacoesAtv = async (atvContratoId) => {
  const response = await httpClient.get(`/api/movimentacoesAtividade/atividade/${atvContratoId}`);
  return response.data;
};