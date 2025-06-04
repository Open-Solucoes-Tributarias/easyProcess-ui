import httpClient from './httpClient';

// GET
export const getCliente= async () => {
  const response = await httpClient.get('/api/clientes');
  return response.data;
};

// GET por ID
export const getByIdCliente = async ({id}) => {
  const response = await httpClient.get(`'/api/clientes'${id}`);
  return response.data;
};

//POST
export const registerCliente = async (data) => {
  const response = await httpClient.post('/api/clientes', data);
  return response.data;
};

//PUT

export const editCliente = async ({id}) => {
  const response = await httpClient.put(`'/api/clientes'${id}`);
  return response.data;
};


//DELETE
export const deleteCliente = async ({id}) => {
  const response = await httpClient.delete(`'/api/clientes'${id}`);
  return response.data;
};

