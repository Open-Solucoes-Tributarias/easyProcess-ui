import { createContext, useContext, useEffect, useState } from "react";
import {
  getCliente,
  registerCliente,
  editCliente,
  deleteCliente,
} from "../services/ClienteService";

const ClienteContext = createContext();

export const ClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [clienteIsEditOpen, setClienteIsEditOpen] = useState(false);
  const [clienteModoEdicao, setClienteModoEdicao] = useState(false);
  const [clienteLoading, setClienteLoading] = useState(false);
  

  // Lista todos os clientes
  const listarClientes = async () => {
    try {
      const dados = await getCliente();
      alert('cliente requisitados')
      console.log('clientes requisitados', clientes);
      setClientes(dados);
    } catch (err) {
      console.error("Erro ao listar clientes", err);
    }
  };

 //funcao alterar um valor 
const handleChangeCliente = (e) => {
  const { name, value } = e.target;
  setClienteSelecionado((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  // Abrir modal para cadastro
  const clienteAbrirCadastro = () => {
    setClienteSelecionado({});
    setClienteModoEdicao(false);
    setClienteIsEditOpen(true);
  };

  // Abrir modal para edição
  const clienteAbrirEdicao = (cliente) => {
    setClienteSelecionado(cliente);
    setClienteModoEdicao(true);
    setClienteIsEditOpen(true);
  };

  // Salvar cliente (criação ou edição)
  const salvarCliente = async () => {
    try {
      setClienteLoading(true);

      if (clienteModoEdicao && clienteSelecionado?.id) {
        await editCliente(clienteSelecionado.id, clienteSelecionado);
      } else {
        await registerCliente(clienteSelecionado);
      }

      await listarClientes();
      setClienteIsEditOpen(false);
    } catch (err) {
      console.error("Erro ao salvar cliente", err);
    } finally {
      setClienteLoading(false);
    }
  };

  // Excluir cliente
  const excluirCliente = async (id) => {
    try {
      setClienteLoading(true);
      await deleteCliente(id);
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



  return (
    <ClienteContext.Provider
      value={{
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
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};

export const useCliente = () => useContext(ClienteContext);
