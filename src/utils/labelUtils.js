//filtro de labels de perfil do usuario

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

