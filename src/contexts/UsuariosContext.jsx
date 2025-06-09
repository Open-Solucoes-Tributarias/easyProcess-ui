import { createContext, useContext, useEffect, useState } from "react";
import {
  buscarUsuarios,
  registrarUsuario,
  editarUsuario,
  deletarUsuario,
} from "../services/usuarioService";

const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [usuarioIsEditOpen, setUsuarioIsEditOpen] = useState(false);
  const [usuarioModoEdicao, setUsuarioModoEdicao] = useState(false);
  const [usuarioLoading, setUsuarioLoading] = useState(false);

  // Listar todos os usuários
  const listarUsuarios = async () => {
    try {
      const dados = await buscarUsuarios();
      setUsuarios(dados);
    } catch (err) {
      console.error("Erro ao listar usuários", err);
    }
  };

  // Manipular campos do formulário
  const handleChangeUsuario = (e) => {
    const { name, value } = e.target;
    setUsuarioSelecionado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Abrir modal para cadastro
  const usuarioAbrirCadastro = () => {
    setUsuarioSelecionado({});
    setUsuarioModoEdicao(false);
    setUsuarioIsEditOpen(true);
  };

  // Abrir modal para edição
  const usuarioAbrirEdicao = (usuario) => {
    setUsuarioSelecionado(usuario);
    setUsuarioModoEdicao(true);
    setUsuarioIsEditOpen(true);
  };

  // Salvar usuário (criação ou edição)
  const salvarUsuario = async () => {
    try {
      setUsuarioLoading(true);
      if (usuarioModoEdicao && usuarioSelecionado?.id) {
        await editarUsuario(usuarioSelecionado.id, usuarioSelecionado);
      } else {
        await registrarUsuario(usuarioSelecionado);
      }
      await listarUsuarios();
      setUsuarioIsEditOpen(false);
    } catch (err) {
      console.error("Erro ao salvar usuário", err);
    } finally {
      setUsuarioLoading(false);
    }
  };

  // Excluir usuário
  const excluirUsuario = async (id) => {
    try {
      setUsuarioLoading(true);
      await deletarUsuario(id);
      await listarUsuarios();
    } catch (err) {
      console.error("Erro ao excluir usuário", err);
    } finally {
      setUsuarioLoading(false);
    }
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        usuarioSelecionado,
        setUsuarioSelecionado,
        usuarioIsEditOpen,
        setUsuarioIsEditOpen,
        usuarioModoEdicao,
        usuarioLoading,
        listarUsuarios,
        usuarioAbrirCadastro,
        usuarioAbrirEdicao,
        salvarUsuario,
        excluirUsuario,
        handleChangeUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuarios = () => useContext(UsuariosContext);
