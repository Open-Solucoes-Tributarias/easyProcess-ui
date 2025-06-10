import httpClient from './httpClient';

// GET
export const buscarAtividadesContrato = async (id) => {
  const response = await httpClient.get(`/api/atividadescontrato/contrato/${id}`);
  return response.data;
};

// GET por ID
export const buscarPorIdAtividadesContrato = async (id) => {
  const response = await httpClient.get(`/api/atividadescontrato'${id}`);
  return response.data;
};

//POST
export const registrarAtividadesContrato = async (data) => {
  const response = await httpClient.post('/api/atividadescontrato', data);
  return response.data;
};

//PUT
export const editarAtividadesContrato = async (id) => {
  const response = await httpClient.put(`/api/atividadescontrato'${id}`);
  return response.data;
};

//DELETE
export const removerAtividadesContrato = async (id) => {
  const response = await httpClient.delete(`/api/atividadescontrato/${id}`);
  return response.data;
};

