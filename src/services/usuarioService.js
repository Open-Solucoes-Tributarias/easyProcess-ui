import httpClient from './httpClient';

// GET
export const buscarUsuarios = async () => {
  const response = await httpClient.get('/api/usuarios');
  return response.data;
};

// GET por ID
export const buscarUsuarioPorId = async (id) => {
  const response = await httpClient.get(`/api/usuarios/${id}`);
  return response.data;
};

//POST
export const registrarUsuario = async (data) => {
  const response = await httpClient.post('/api/usuarios', data);
  return response.data;
};

//PUT
export const editarUsuario = async (id, data) => {
  const response = await httpClient.put(`/api/usuarios/${id}`, data);
  return response.data;
};

//DELETE
export const deletarUsuario = async (id) => {
  const response = await httpClient.delete(`/api/usuarios/${id}`);
  return response.data;
};


