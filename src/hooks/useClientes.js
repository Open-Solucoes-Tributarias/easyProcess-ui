import { useEffect, useState } from "react";
import {
  buscarClientes,
  registrarCliente,
  editarCliente,
  removerCliente,
} from "../services/ClienteService";

const empresaId = JSON.parse(localStorage.getItem('user'))?.empresaId;

export const clienteInicial = {
  id: 0,
  nomeFantasia: '',
  razaoSocial: '',
  cnpj: '',
  dataCadastro: new Date().toISOString(),
  empresaId: empresaId,
};

export const useCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(clienteInicial);
  const [clienteIsEditOpen, setClienteIsEditOpen] = useState(false);
  const [clienteModoEdicao, setClienteModoEdicao] = useState(false);
  const [clienteLoading, setClienteLoading] = useState(false);

  const listarClientes = async () => {
    try {
      const dados = await buscarClientes();
      setClientes(dados);
    } catch (err) {
      console.error("Erro ao listar clientes", err);
    }
  };

  const handleChangeCliente = (e) => {
    const { name, value } = e.target;
    setClienteSelecionado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clienteAbrirCadastro = () => {
    setClienteSelecionado(clienteInicial);
    setClienteModoEdicao(false);
    setClienteIsEditOpen(true);
  };

  const clienteAbrirEdicao = (cliente) => {
    setClienteSelecionado(cliente);
    setClienteModoEdicao(true);
    setClienteIsEditOpen(true);
  };

  const salvarCliente = async () => {
    try {
      setClienteLoading(true);

      if (clienteModoEdicao && clienteSelecionado?.id) {
        await editarCliente(clienteSelecionado.id, clienteSelecionado);
      } else {
        await registrarCliente(clienteSelecionado);
      }

      await listarClientes();
      setClienteIsEditOpen(false);
    } catch (err) {
      console.error("Erro ao salvar cliente", err);
    } finally {
      setClienteLoading(false);
    }
  };

  const excluirCliente = async (id) => {
    try {
      setClienteLoading(true);
      await removerCliente(id);
      await listarClientes();
    } catch (err) {
      console.error("Erro ao deletar cliente", err);
    } finally {
      setClienteLoading(false);
    }
  };

  useEffect(() => {
    listarClientes();
  }, []);

  return {
    clientes,
    clienteSelecionado,
    setClienteSelecionado,
    clienteIsEditOpen,
    setClienteIsEditOpen,
    clienteModoEdicao,
    clienteLoading,
    clienteAbrirCadastro,
    clienteAbrirEdicao,
    salvarCliente,
    excluirCliente,
    listarClientes,
    handleChangeCliente,
  };
};
