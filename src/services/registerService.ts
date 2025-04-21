import httpClient from './httpClient'

export interface RegisterRequest {
  nome: string
  email: string
  senha: string
  clienteId?: number | null
  perfil?: number | null
}

export interface RegisterResponse {
  token: string
  expiracao: string
  usuario: string
}

// Função para fazer o cadastro (registro)
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await httpClient.post<RegisterResponse>('/api/Auth/register', data)
  return response.data
}
