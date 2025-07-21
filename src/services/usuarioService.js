import httpClient from './httpClient';

// GET
export const buscarUsuarios = async () => {
  const response = await httpClient.get('/usuarios');
  return response.data;
};

// GET por ID
export const buscarUsuarioPorId = async (id) => {
  const response = await httpClient.get(`/usuarios/${id}`);
  return response.data;
};

//POST
export const registrarUsuario = async (data) => {
  const response = await httpClient.post('/usuarios', data);
  return response.data;
};

//PUT
export const editarUsuario = async (id, data) => {
  const response = await httpClient.put(`/usuarios/${id}`, data);
  return response.data;
};

//DELETE
export const deletarUsuario = async (id) => {
  const response = await httpClient.delete(`/usuarios/${id}`);
  return response.data;
};


