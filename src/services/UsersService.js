import httpClient from './httpClient';

// GET
export const getUsers= async () => {
  const response = await httpClient.get('/api/usuarios');
  return response.data;
};

// GET por ID
export const getByIdUser = async (id) => {
  const response = await httpClient.get(`/api/usuarios/${id}`);
  return response.data;
};

//POST
export const registerUser = async (data) => {
  const response = await httpClient.post('/api/usuarios', data);
  return response.data;
};

//PUT
export const editUser = async (id, data) => {
  const response = await httpClient.put(`/api/usuarios/${id}`, data);
  return response.data;
};

//DELETE
export const deleteUser = async (id) => {
  const response = await httpClient.delete(`/api/usuarios/${id}`);
  return response.data;
};


