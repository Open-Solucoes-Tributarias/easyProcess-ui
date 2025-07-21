import httpClient from './httpClient';

// GET
export const buscarClientes = async () => {
  const response = await httpClient.get('/clientes');
  return response.data;
};

// GET por ID
export const buscarClientePorId = async (id) => {
  const response = await httpClient.get(`/clientes/${id}`);
  return response.data;
};

//POST
export const registrarCliente = async (data) => {
  const response = await httpClient.post('/clientes', data);
  return response.data;
};

//PUT

export const editarCliente = async (id, data) => {
  const response = await httpClient.put(`/clientes/${id}`, data);
  return response.data;
};


//DELETE
export const removerCliente = async (id) => {
  const response = await httpClient.delete(`/clientes/${id}`);
  return response.data;
};

