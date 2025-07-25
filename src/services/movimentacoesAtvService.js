import httpClient from './httpClient';

// GET
export const buscarMovimentacoesAtv = async (atvContratoId) => {
  const response = await httpClient.get(`/movimentacoesAtividade/atividade/${atvContratoId}`);
  return response.data;
};