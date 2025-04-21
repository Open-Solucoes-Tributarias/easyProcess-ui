import httpClient from './httpClient'

// Interfaces conforme estrutura da resposta
export interface FrentePorEmpresa {
  empresa: string
  frenteDeTrabalhoId: number
  frenteDeTrabalhoNome: string
}

export interface AtividadePorFrente {
  frenteDeTrabalho: string
  totalAtividades: number
}

export interface AtividadePorUsuario {
  usuarioNome: string
  totalAtividades: number
}

export interface StatusResumo {
  totalConcluidas: number
  totalPendentes: number
  totalAtrasadas: number
}

export interface ResumoResponse {
  frentesPorEmpresa: FrentePorEmpresa[]
  atividadesPorFrente: AtividadePorFrente[]
  atividadesPorUsuario: AtividadePorUsuario[]
  statusResumo: StatusResumo
}

// Função que consome o endpoint
export const getResumo = async (): Promise<ResumoResponse> => {
  const response = await httpClient.get<ResumoResponse>('/api/resumo')
  return response.data
}
