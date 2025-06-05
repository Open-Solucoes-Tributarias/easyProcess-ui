import httpClient from './httpClient';

// GET
export const getContrato = async (id) => {
  const response = await httpClient.get(`/api/contratos/cliente/${id}`);
  return response.data;
};

// GET por ID
export const getByIdContrato = async (id) => {
  const response = await httpClient.get(`/api/contratos'${id}`);
  return response.data;
};

//POST
export const registerContrato = async (data) => {
  const response = await httpClient.post('/api/contratos', data);
  return response.data;
};

//PUT

export const editContrato = async (id) => {
  const response = await httpClient.put(`/api/contratos'${id}`);
  return response.data;
};


//DELETE
export const deleteContrato = async (id) => {
  const response = await httpClient.delete(`'/api/contratos'${id}`);
  return response.data;
};

