import { useEffect, useState } from "react";
import {
  buscarUsuarios,
  registrarUsuario,
  editarUsuario,
  deletarUsuario,
} from "../services/usuarioService";

const empresaId = JSON.parse(localStorage.getItem('user'))?.empresaId;

export const usuarioInicial = {
  id: 0,
  nome: "",
  email: "",
  senha: "",
  empresaId: empresaId,
  perfil: 2,
};

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(usuarioInicial);
  const [usuarioIsEditOpen, setUsuarioIsEditOpen] = useState(false);
  const [usuarioModoEdicao, setUsuarioModoEdicao] = useState(false);
  const [usuarioLoading, setUsuarioLoading] = useState(false);

  const listarUsuarios = async () => {
    try {
      const dados = await buscarUsuarios();
      setUsuarios(dados);     
    } catch (err) {
      console.error("Erro ao listar usuários", err);
    }
  };

  const handleChangeUsuario = (e) => {
    const { name, value } = e.target;
    setUsuarioSelecionado((prev) => ({
      ...prev,
      [name]: name === "perfil" ? Number(value) : value,
    }));
  };

  const usuarioAbrirCadastro = () => {
    setUsuarioSelecionado(usuarioInicial);
    setUsuarioModoEdicao(false);
    setUsuarioIsEditOpen(true);
  };

  const usuarioAbrirEdicao = (usuario) => {
    setUsuarioSelecionado(usuario);
    setUsuarioModoEdicao(true);
    setUsuarioIsEditOpen(true);
  };

  const salvarUsuario = async () => {
    try {
      setUsuarioLoading(true);
      if (usuarioModoEdicao && usuarioSelecionado?.id && usuarioSelecionado.id !== 0) {
        await editarUsuario(usuarioSelecionado.id, usuarioSelecionado);
      } else {
        const novoUsuario = { ...usuarioSelecionado, id: 0 };
        await registrarUsuario(novoUsuario);
      }
      await listarUsuarios();
      setUsuarioIsEditOpen(false);
    } catch (err) {
      console.error("Erro ao salvar usuário", err);
    } finally {
      setUsuarioLoading(false);
    }
  };

  const excluirUsuario = async (id) => {
    try {
      setUsuarioLoading(true);
      await deletarUsuario(id);
      await listarUsuarios();
      setUsuarioIsEditOpen(false);
    } catch (err) {
      console.error("Erro ao excluir usuário", err);
    } finally {
      setUsuarioLoading(false);
    }
  };

  useEffect(() => {
    if (usuarios.length === 0) {
      listarUsuarios();
    }
  }, []);

  return {
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
    usuarioInicial,
  };
};
