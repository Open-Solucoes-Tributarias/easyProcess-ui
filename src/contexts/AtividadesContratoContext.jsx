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

  const salvarAtividadeContrato = async (atividade) => {
    try {
      const payload = {
        ...atividade,
        id: 0 // garante id 0 no POST
      };

      if (atividade?.id && atividade.id !== 0) {
        await editarAtividadesContrato(atividade.id, atividade);
      } else {
        await registrarAtividadesContrato(payload);
      }

      await listarAtividadesContrato(atividade.contratoId);
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
        atividadeInicial
      }}
    >
      {children}
    </AtividadesContratoContext.Provider>
  );
};

export const useAtividadesContrato = () => useContext(AtividadesContratoContext);
