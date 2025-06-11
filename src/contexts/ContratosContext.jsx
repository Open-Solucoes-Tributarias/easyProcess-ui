import { createContext, useContext, useEffect, useState } from "react";
import {
  buscarContratos,
  registrarContrato,
  editarContrato,
  removerContrato,
  buscarContratosGeral
} from "../services/contratosService";

const ContratoContext = createContext();

const empresaId = JSON.parse(localStorage.getItem('user'))?.empresaId;

export const contratoInicial = {
  id: 0,
  clienteId: 0,
  empresaId: empresaId,
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

  // Listar todos os contratos ou filtrando por cliente
  const listarContratos = async (clienteId = null, listarGeral = false) => {
    try {
      let dados;
      if (listarGeral || !clienteId) {
        dados = await buscarContratosGeral();
      } else {
        dados = await buscarContratos(clienteId);
      }
      setContratos(dados);
    } catch (err) {
      console.error("Erro ao listar contratos", err);
    }
  };

  const handleChangeContrato = (e) => {
    const { name, value } = e.target;
    setContratoSelecionado((prev) => ({
      ...prev,
      [name]: name === 'clienteId' || name === 'supervisorUsuarioId' ? Number(value) : value
    }));
  };

  const contratoAbrirCadastro = () => {
    setContratoSelecionado(contratoInicial);
    setContratoModoEdicao(false);
    setContratoIsEditOpen(true);
  };

  const contratoAbrirEdicao = (contrato) => {
    setContratoSelecionado(contrato);
    setContratoModoEdicao(true);
    setContratoIsEditOpen(true);
  };

  const salvarContrato = async (listarGeral = false) => {
    try {
      setContratoLoading(true);

      if (contratoModoEdicao && contratoSelecionado?.id && contratoSelecionado.id !== 0) {
        await editarContrato(contratoSelecionado.id, contratoSelecionado);
      } else {
        const novoContrato = { ...contratoSelecionado, id: 0 };
        await registrarContrato(novoContrato);
      }

      await listarContratos(contratoSelecionado.clienteId, listarGeral);
      setContratoIsEditOpen(false);
    } catch (err) {
      console.error("Erro ao salvar contrato", err);
    } finally {
      setContratoLoading(false);
    }
  };

  const excluirContrato = async (id, clienteId, listarGeral = false) => {
    try {
      setContratoLoading(true);
      await removerContrato(id);
      setContratoIsEditOpen(false);
      await listarContratos(clienteId, listarGeral);
    } catch (err) {
      console.error("Erro ao deletar contrato", err);
    } finally {
      setContratoLoading(false);
    }
  };

  useEffect(() => {
    listarContratos(); // por padrão, traz todos
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
