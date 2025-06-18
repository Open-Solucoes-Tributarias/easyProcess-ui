import httpClient from './httpClient';

// GET
export const buscarFrentes = async () => {
  const response = await httpClient.get('/api/frentesDeTrabalho/empresa');
  return response.data;
};

// GET por ID
export const buscarFrentesPorId = async (id) => {
  const response = await httpClient.get(`/api/frentesDeTrabalho/${id}`);
  return response.data;
};

//POST
export const registrarFrente = async (data) => {
  const response = await httpClient.post('/api/frentesDeTrabalho', data);
  return response.data;
};

//PUT

export const editarFrente = async (id, data) => {
  const response = await httpClient.put(`/api/frentesDeTrabalho/${id}`, data);
  return response.data;
};


//DELETE
export const removerFrente = async (id) => {
  const response = await httpClient.delete(`/api/frentesDeTrabalho/${id}`);
  return response.data;
};

