import httpClient from './httpClient';

// GET
export const buscarContratos = async (id) => {
  const response = await httpClient.get(`/api/contratos/cliente/${id}`);
  return response.data;
};

// GET por ID
export const buscarContratoPorId = async (id) => {
  const response = await httpClient.get(`/api/contratos/${id}`);
  return response.data;
};

//POST
export const registrarContrato = async (data) => {
  const response = await httpClient.post('/api/contratos', data);
  return response.data;
};

//PUT
export const editarContrato = async (id) => {
  const response = await httpClient.put(`/api/contratos/${id}`, data);
  return response.data;
};

//DELETE
export const removerContrato = async (id) => {
  const response = await httpClient.delete(`/api/contratos/${id}`);
  return response.data;
};

