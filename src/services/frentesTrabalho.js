import httpClient from './httpClient';

// GET
export const buscarFrentes = async () => {
  const response = await httpClient.get('/frentesDeTrabalho/empresa');
  return response.data;
};

// GET por ID
export const buscarFrentesPorId = async (id) => {
  const response = await httpClient.get(`/frentesDeTrabalho/${id}`);
  return response.data;
};

//POST
export const registrarFrente = async (data) => {
  const response = await httpClient.post('/frentesDeTrabalho', data);
  return response.data;
};

//PUT

export const editarFrente = async (id, data) => {
  const response = await httpClient.put(`/frentesDeTrabalho/${id}`, data);
  return response.data;
};


//DELETE
export const removerFrente = async (id) => {
  const response = await httpClient.delete(`/frentesDeTrabalho/${id}`);
  return response.data;
};

