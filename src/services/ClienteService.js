import httpClient from './httpClient';

// GET
export const buscarClientes = async () => {
  const response = await httpClient.get('/api/clientes');
  return response.data;
};

// GET por ID
export const buscarClientePorId = async (id) => {
  const response = await httpClient.get(`/api/clientes/${id}`);
  return response.data;
};

//POST
export const registrarCliente = async (data) => {
  const response = await httpClient.post('/api/clientes', data);
  return response.data;
};

//PUT

export const editarCliente = async (id, data) => {
  const response = await httpClient.put(`/api/clientes/${id}`, data);
  return response.data;
};


//DELETE
export const removerCliente = async (id) => {
  const response = await httpClient.delete(`/api/clientes/${id}`);
  return response.data;
};

