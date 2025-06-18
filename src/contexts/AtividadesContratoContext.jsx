import { createContext, useContext, useState } from "react";
import {
  buscarAtividadesContrato,
  registrarAtividadesContrato,
  editarAtividadesContrato,
  removerAtividadesContrato
} from "../services/atividadesContrato";

const AtividadesContratoContext = createContext();

// Modelo base da atividade (boas práticas)
const atividadeInicial = {
  id: 0,
  contratoId: 0,
  atividadeId: 0,
  usuarioDelegadoId: 0,
  sequencia: 0,
  statusAtividade: 0,
  descricaoCustomizada: '',
  dataLimite: new Date().toISOString(),
  nomeUsuarioDelegado: ''
};

export const AtividadesContratoProvider = ({ children }) => {
  const [atividadesContrato, setAtividadesContrato] = useState([]);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(atividadeInicial);
  const [loadingAtividades, setLoadingAtividades] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);

  const listarAtividadesContrato = async (contratoId) => {
    try {
      setLoadingAtividades(true);
      const dados = await buscarAtividadesContrato(contratoId);
      setAtividadesContrato(dados);
    } catch (error) {
      console.error("Erro ao buscar atividades do contrato:", error);
    } finally {
      setLoadingAtividades(false);
    }
  };

const salvarAtividadeContrato = async (atividade = atividadeSelecionada) => {
  try {
    const isEdicao = atividade?.id && atividade.id !== 0;

    const payload = {
      ...atividade,
      usuarioDelegadoId: Number(atividade.usuarioDelegadoId),
      nomeUsuarioDelegado: atividade.nomeUsuarioDelegado || '', // garantir compatibilidade
    };

    if (isEdicao) {
      await editarAtividadesContrato(payload.id, payload);
    } else {
      payload.id = 0; // garantir id 0 apenas no POST
      await registrarAtividadesContrato(payload);
    }

    await listarAtividadesContrato(payload.contratoId);
    setModalEditarAberto(false);
  } catch (err) {
    console.error("Erro ao salvar atividade do contrato", err);
  }
};


  const excluirAtividadeContrato = async (id, contratoId) => {
    try {
      await removerAtividadesContrato(id);
      await listarAtividadesContrato(contratoId);
    } catch (err) {
      console.error("Erro ao deletar atividade", err);
    }
  };

const handleChangeAtvContrato = (e) => {
  const { name, value } = e.target;

  setAtividadeSelecionada((prev) => {
    const updated = {
      ...prev,
      [name]: ['usuarioDelegadoId', 'statusAtividade'].includes(name)
        ? Number(value)
        : value,
    };

    return updated;
  });
};


  return (
    <AtividadesContratoContext.Provider
      value={{
        atividadesContrato,
        atividadeSelecionada,
        setAtividadeSelecionada,
        loadingAtividades,
        modalEditarAberto,
        setModalEditarAberto,
        listarAtividadesContrato,
        salvarAtividadeContrato,
        excluirAtividadeContrato,
        atividadeInicial,
        handleChangeAtvContrato
      }}
    >
      {children}
    </AtividadesContratoContext.Provider>
  );
};

export const useAtividadesContrato = () => useContext(AtividadesContratoContext);
