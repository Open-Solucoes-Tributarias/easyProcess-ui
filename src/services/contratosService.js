import httpClient from './httpClient';

// GET
export const buscarContratosGeral = async () => {
  const response = await httpClient.get(`/contratos`);
  return response.data;
};

export const buscarContratos = async (id) => {
  const response = await httpClient.get(`/contratos/cliente/${id}`);
  return response.data;
};

// GET por ID
export const buscarContratoPorId = async (id) => {
  const response = await httpClient.get(`/contratos/${id}`);
  return response.data;
};

//POST
export const registrarContrato = async (data) => {
  const response = await httpClient.post('/contratos', data);
  return response.data;
};

//PUT
export const editarContrato = async (id, data) => {
  const response = await httpClient.put(`/contratos/${id}`, data);
  return response.data;
};

//DELETE
export const removerContrato = async (id) => {
  const response = await httpClient.delete(`/contratos/${id}`);
  return response.data;
};

