// atribui atividades a uma frente de trabalho

import httpClient from './httpClient';

// GET
export const buscarFrentesAtv = async (frenteId) => {
  const response = await httpClient.get(`/frenteDeTrabalhoAtividade/frente/${frenteId}`);
  return response.data;
};

//POST
export const registrarFrenteAtv = async (data) => {
  const response = await httpClient.post('/frenteDeTrabalhoAtividade', data);
  return response.data;
};

//DELETE
export const removerFrenteAtv = async (id) => {
  const response = await httpClient.delete(`/frenteDeTrabalhoAtividade/${id}`);
  return response.data;
};

