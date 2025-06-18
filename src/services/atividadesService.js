import httpClient from './httpClient';

// GET
export const buscarAtividades = async () => {
  const response = await httpClient.get('/api/atividades/empresa');
  return response.data;
};

// GET por ID
export const buscarAtividadePorId = async (id) => {
  const response = await httpClient.get(`/api/atividades/${id}`);
  return response.data;
};

//POST
export const registrarAtividade = async (data) => {
  const response = await httpClient.post('/api/atividades', data);
  return response.data;
};

//PUT

export const editarAtividade = async (id, data) => {
  const response = await httpClient.put(`/api/atividades/${id}`, data);
  return response.data;
};


//DELETE
export const removerAtividade = async (id) => {
  const response = await httpClient.delete(`/api/atividades/${id}`);
  return response.data;
};

