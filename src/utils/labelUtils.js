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
