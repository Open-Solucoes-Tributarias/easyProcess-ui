//filtro de labels de perfil do usuario

const perfilLabels = {
  0: "Administrador do sistema",
  1: "Administrador",
  2: "Supervisor",
  3: "Colaborador"
};

export const getPerfilLabel = (perfil) => perfilLabels[perfil] ?? "Perfil de permissão indefinido";

