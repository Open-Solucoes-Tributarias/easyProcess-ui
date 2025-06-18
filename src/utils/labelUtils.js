//filtro de labels de perfil do usuario

import { Atividades } from "../pages/gerenciar/secoes/Atividades";

const perfilLabels = {
  0: "Administrador do sistema",
  1: "Administrador",
  2: "Supervisor",
  3: "Colaborador"
};

export const getPerfilLabel = (perfil) => perfilLabels[perfil] ?? "Perfil de permissão indefinido";

const tipoAtvLabel = {
  1: "Única",
  2: "Recorrente",
};

export const getTipoAtvLabel = (tipo) => tipoAtvLabel[tipo] ?? "Tipo de atividade não atribuido";

// status de uma Atividades
//  Pendente = 0,
//  Em Andamento = 1,
//  Concluida = 2,
//  Atrasada = 3

const statusAtvLabel = {
  0: "Pendente",
  1: "Em andamento",
  2: "Concluída",
  3: "Atrasada"
};

export const getStatusAtividade = (status) => statusAtvLabel[status] ?? null;

// Períodos de uma Atividade
// Diario = 1,
// Semanal = 2,
// Quinzenal = 3,
// Mensal = 4,
// Semestral = 5,
// Personalizado = 6

const periodoAtvLabel = {
  1: "Diário",
  2: "Semanal",
  3: "Quinzenal",
  4: "Mensal",
  5: "Semestral",
  6: "Personalizado"
};

export const getPeriodoAtividade = (periodo) => periodoAtvLabel[periodo] ?? null;

