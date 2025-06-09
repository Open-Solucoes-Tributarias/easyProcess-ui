import { createContext, useContext, useEffect, useState } from "react";
import {
  buscarContratos,
  registrarContrato,
  editarContrato,
  removerContrato
} from "../services/contratosService";

const ContratoContext = createContext();

export const contratoInicial = {
  id: 0,
  clienteId: 0,
  empresaId: 0,
  supervisorUsuarioId: 0,
  descricao: '',
  dataInicio: new Date().toISOString(),
  dataFim: new Date().toISOString(),
  nomeSupervisor: ''
};

export const ContratoProvider = ({ children }) => {
  const [contratos, setContratos] = useState([]);
  const [contratoSelecionado, setContratoSelecionado] = useState(contratoInicial);
  const [contratoIsEditOpen, setContratoIsEditOpen] = useState(false);
  const [contratoModoEdicao, setContratoModoEdicao] = useState(false);
  const [contratoLoading, setContratoLoading] = useState(false);

  // Listar todos os contratos de um cliente (ou todos, se não filtrar)
  const listarContratos = async (clienteId) => {
    try {
      const dados = await buscarContratos(clienteId);
      setContratos(dados);
    } catch (err) {
      console.error("Erro ao listar contratos", err);
    }
  };

  // Alterar campos do contrato selecionado
  const handleChangeContrato = (e) => {
    const { name, value } = e.target;
    setContratoSelecionado((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Abrir modal para cadastro
  const contratoAbrirCadastro = () => {
    setContratoSelecionado(contratoInicial);
    setContratoModoEdicao(false);
    setContratoIsEditOpen(true);
  };

  // Abrir modal para edição
  const contratoAbrirEdicao = (contrato) => {
    setContratoSelecionado(contrato);
    setContratoModoEdicao(true);
    setContratoIsEditOpen(true);
  };

  // Salvar contrato (novo ou editar)
  const salvarContrato = async () => {
    try {
      setContratoLoading(true);

      if (contratoModoEdicao && contratoSelecionado?.id && contratoSelecionado.id !== 0) {
        await editarContrato(contratoSelecionado.id, contratoSelecionado);
      } else {
        const novoContrato = { ...contratoSelecionado, id: 0 };
        await registrarContrato(novoContrato);
      }

      await listarContratos(contratoSelecionado.clienteId);
      setContratoIsEditOpen(false);
    } catch (err) {
      console.error("Erro ao salvar contrato", err);
    } finally {
      setContratoLoading(false);
    }
  };

  // Excluir contrato
  const excluirContrato = async (id, clienteId) => {
    try {
      setContratoLoading(true);
      await removerContrato(id);
      await listarContratos(clienteId);
    } catch (err) {
      console.error("Erro ao deletar contrato", err);
    } finally {
      setContratoLoading(false);
    }
  };

  useEffect(() => {
    listarContratos();
  }, []);

  return (
    <ContratoContext.Provider
      value={{
        contratos,
        contratoSelecionado,
        setContratoSelecionado,
        contratoIsEditOpen,
        setContratoIsEditOpen,
        contratoModoEdicao,
        contratoLoading,
        contratoAbrirCadastro,
        contratoAbrirEdicao,
        salvarContrato,
        excluirContrato,
        listarContratos,
        handleChangeContrato,
        contratoInicial
      }}
    >
      {children}
    </ContratoContext.Provider>
  );
};

export const useContrato = () => useContext(ContratoContext);
