import { createContext, useContext, useEffect, useState } from "react";
import {
  buscarContratos,
  registrarContrato,
  editarContrato,
  removerContrato
} from "../services/contratosService";

const ContratoContext = createContext();

const contratoInicial = {
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

  // Listar todos os contratos
  const listarContratos = async (clienteId) => {
    try {
      const dados = await buscarContratos(clienteId);
      setContratos(dados);
    } catch (err) {
      console.error("Erro ao listar contratos", err);
    }
  };

  // Manipular campos
  const handleChangeContrato = (e) => {
    const { name, value } = e.target;
    setContratoSelecionado((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Abrir modal de cadastro
  const contratoAbrirCadastro = () => {
    setContratoSelecionado(contratoInicial);
    setContratoModoEdicao(false);
    setContratoIsEditOpen(true);
  };

  // Abrir modal de edição
  const contratoAbrirEdicao = (contrato) => {
    setContratoSelecionado(contrato);
    setContratoModoEdicao(true);
    setContratoIsEditOpen(true);
  };

  // Salvar contrato (novo ou editar)
  const salvarContrato = async () => {
    try {
      setContratoLoading(true);
      if (contratoModoEdicao && contratoSelecionado?.id) {
        await editarContrato(contratoSelecionado.id, contratoSelecionado);
      } else {
        await registrarContrato(contratoSelecionado);
      }
      await listarContratos();
      setContratoIsEditOpen(false);
    } catch (err) {
      console.error("Erro ao salvar contrato", err);
    } finally {
      setContratoLoading(false);
    }
  };

  // Excluir contrato
  const excluirContrato = async (id) => {
    try {
      setContratoLoading(true);
      await removerContrato(id);
      await listarContratos();
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
        handleChangeContrato
      }}
    >
      {children}
    </ContratoContext.Provider>
  );
};

export const useContrato = () => useContext(ContratoContext);
