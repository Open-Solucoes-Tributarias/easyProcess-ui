import httpClient from './httpClient'

// Criar uma nova empresa
export const createEmpresa = async (data) => {
  const response = await httpClient.post('/api/empresas', data)
  return response.data
}

// Listar todas as empresas
export const getEmpresas = async () => {
  const response = await httpClient.get('/api/empresas')
  return response.data
}

// Buscar uma empresa por ID
export const getEmpresaById = async (id) => {
  const response = await httpClient.get(`/api/empresas/${id}`)
  return response.data
}

// Atualizar uma empresa
export const updateEmpresa = async (id, data) => {
  const response = await httpClient.put(`/api/empresas/${id}`, data)
  return response.data
}

// Deletar uma empresa
export const deleteEmpresa = async (id) => {
  await httpClient.delete(`/api/empresas/${id}`)
}
