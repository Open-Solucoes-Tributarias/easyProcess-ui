import httpClient from './httpClient'

export interface Empresa {
  id: number
  nome: string
  cnpj: string
  dataAssinaturaContrato: string
  clienteId: number || null
  frenteDeTrabalhoIds: number[]
}

// Criar uma nova empresa
export const createEmpresa = async (data: Omit<Empresa, 'id'>): Promise<Empresa> => {
  const response = await httpClient.post<Empresa>('/api/empresas', data)
  return response.data
}

// Listar todas as empresas
export const getEmpresas = async (): Promise<Empresa[]> => {
  const response = await httpClient.get<Empresa[]>('/api/empresas')
  return response.data
}

// Buscar uma empresa por ID
export const getEmpresaById = async (id: number): Promise<Empresa> => {
  const response = await httpClient.get<Empresa>(`/api/empresas/${id}`)
  return response.data
}

// Atualizar uma empresa
export const updateEmpresa = async (id: number, data: Omit<Empresa, 'id'>): Promise<Empresa> => {
  const response = await httpClient.put<Empresa>(`/api/empresas/${id}`, data)
  return response.data
}

// Deletar uma empresa
export const deleteEmpresa = async (id: number): Promise<void> => {
  await httpClient.delete(`/api/empresas/${id}`)
}
