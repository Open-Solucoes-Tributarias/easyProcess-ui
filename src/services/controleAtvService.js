import httpClient from './httpClient';

// GET

export const buscarControleAtv = async () => {
  const response = await httpClient.get('/api/controleatividades/empresa');
  return response.data;
};

//POST

// {
//   "atividadeContratoId": 0,
//   "dataHora": "2025-06-06T17:23:43.515Z",
//   "observacao": "string",
//   "anexo": "string"
// }

export const registrarControleAtv = async (data) => {
  const response = await httpClient.post('/api/controleatividades/movimentar', data);
  return response.data;
};


