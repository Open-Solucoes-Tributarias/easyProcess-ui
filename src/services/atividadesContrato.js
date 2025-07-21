import httpClient from './httpClient';

// GET
export const buscarAtividadesContrato = async (id) => {
  const response = await httpClient.get(`/atividadescontrato/contrato/${id}`);
  return response.data;
};

// GET por ID
export const buscarPorIdAtividadesContrato = async (id) => {
  const response = await httpClient.get(`/atividadescontrato'${id}`);
  return response.data;
};

//POST
export const registrarAtividadesContrato = async (data) => {
  const response = await httpClient.post('/atividadescontrato', data);
  return response.data;
};

//PUT
export const editarAtividadesContrato = async (id, data) => {
  const response = await httpClient.put(`/atividadescontrato/${id}`, data);
  return response.data;
};

//DELETE
export const removerAtividadesContrato = async (id) => {
  const response = await httpClient.delete(`/atividadescontrato/${id}`);
  return response.data;
};

