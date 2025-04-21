import httpClient from './httpClient';

// Interface da requisição de login
export interface LoginRequest {
  email: string;
  senha: string;
}

// Interface da resposta do login
export interface LoginResponse {
  token: string;
  expiracao: string;
  usuario: string;
}

// Função para fazer login
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await httpClient.post<LoginResponse>('/api/Auth/login', data);
  return response.data;
};
