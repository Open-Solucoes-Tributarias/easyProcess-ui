import httpClient from './httpClient';

// GET
export const buscarAtividades = async () => {
  const response = await httpClient.get('/atividades/empresa');
  return response.data;
};

// GET por ID
export const buscarAtividadePorId = async (id) => {
  const response = await httpClient.get(`/atividades/${id}`);
  return response.data;
};

//POST
export const registrarAtividade = async (data) => {
  const response = await httpClient.post('/atividades', data);
  return response.data;
};

//PUT

export const editarAtividade = async (id, data) => {
  const response = await httpClient.put(`/atividades/${id}`, data);
  return response.data;
};


//DELETE
export const removerAtividade = async (id) => {
  const response = await httpClient.delete(`/atividades/${id}`);
  return response.data;
};

