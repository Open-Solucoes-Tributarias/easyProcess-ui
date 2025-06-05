import httpClient from './httpClient';

// GET
export const getAtividadesContrato = async (id) => {
  const response = await httpClient.get(`/api/atividadescontrato/contrato/${id}`);
  return response.data;
};

// GET por ID
export const getByIdAtividadesContrato = async (id) => {
  const response = await httpClient.get(`/api/atividadescontrato'${id}`);
  return response.data;
};

//POST
export const registerAtividadesContrato = async (data) => {
  const response = await httpClient.post('/api/atividadescontrato', data);
  return response.data;
};

//PUT
export const editAtividadesContrato = async (id) => {
  const response = await httpClient.put(`/api/atividadescontrato'${id}`);
  return response.data;
};


//DELETE
export const deleteAtividadesContrato = async (id) => {
  const response = await httpClient.delete(`'/api/atividadescontrato'${id}`);
  return response.data;
};

