import { useState } from "react";
import {
  buscarAtividadesContrato,
  registrarAtividadesContrato,
  editarAtividadesContrato,
  removerAtividadesContrato,
} from "../services/atividadesContrato";

// Modelo base da atividade (boas práticas)
export const atividadeInicial = {
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

export const useAtividadesContrato = () => {
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
        nomeUsuarioDelegado: atividade.nomeUsuarioDelegado || '',
      };

      if (isEdicao) {
        await editarAtividadesContrato(payload.id, payload);
      } else {
        payload.id = 0;
        await registrarAtividadesContrato(payload);
      }

      await listarAtividadesContrato(payload.contratoId);
      setModalEditarAberto(false);
    } catch (err) {
      console.error("Erro ao salvar atividade do contrato", err);
    }
  };

  const salvarAtividadesContratoEmLote = async (lista) => {
  const sucesso = [];
  const falhas = [];

  for (const raw of lista) {
    try {
      const payload = {
        ...raw,
        usuarioDelegadoId: Number(raw.usuarioDelegadoId || 0),
        statusAtividade: Number(raw.statusAtividade || 0),
        sequencia: Number(raw.sequencia || 0),
        dataLimite: raw.dataLimite ? new Date(raw.dataLimite).toISOString() : null,
        nomeUsuarioDelegado: raw.nomeUsuarioDelegado || ""
      };

      const isEdicao = payload?.id && payload.id !== 0;
      if (isEdicao) {
        await editarAtividadesContrato(payload.id, payload);
      } else {
        payload.id = 0;
        await registrarAtividadesContrato(payload);
      }

      sucesso.push(payload.atividadeId);
    } catch (err) {
      falhas.push({ descricaoCustomizada: raw.descricaoCustomizada, error: String(err) });
    }
  }

  // reconsulta só uma vez no final
  const contratoId = lista[0]?.contratoId;
  if (contratoId) {
    await listarAtividadesContrato(contratoId);
  }

  return { sucesso, falhas, total: lista.length }; //retorno de sucesso para feedback da UI
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

  return {
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
    salvarAtividadesContratoEmLote,
    handleChangeAtvContrato,
  };
};
