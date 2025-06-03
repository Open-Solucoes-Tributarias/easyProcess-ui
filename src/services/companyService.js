import httpClient from './httpClient'

// Criar uma nova cliente
export const createCliente = async (data) => {
  const response = await httpClient.post('/api/clientes', data)
  return response.data
}

// Listar todas as clientes
export const getClientes = async () => {
  const response = await httpClient.get('/api/clientes')
  return response.data
}

// Buscar uma cliente por ID
export const getClienteById = async (id) => {
  const response = await httpClient.get(`/api/clientes/${id}`)
  return response.data
}

// Atualizar uma cliente
export const updateCliente = async (id, data) => {
  const response = await httpClient.put(`/api/clientes/${id}`, data)
  return response.data
}

// Deletar uma cliente
export const deleteCliente = async (id) => {
  await httpClient.delete(`/api/clientes/${id}`)
}
