import { useEffect, useState } from "react";
import {
  buscarAtividades,
  registrarAtividade,
  editarAtividade,
  removerAtividade,
} from "../services/atividadesService";

const empresaId = JSON.parse(localStorage.getItem("user"))?.empresaId;

export const atividadeInicial = {
  id: 0,
  nome: "",
  tipo: 1,
  periodo: 1,
  intervaloEmDias: 0,
  proximaExecucao: null,
  empresaId: empresaId,
  instrucao: "",
  frenteDeTrabalhoIds: [],
};

export const useAtividades = () => {
  const [atividades, setAtividades] = useState([]);
  const [atividadeAtual, setAtividadeAtual] = useState(atividadeInicial);
  const [atividadeIsEditOpen, setAtividadeIsEditOpen] = useState(false);
  const [atividadeModoEdicao, setAtividadeModoEdicao] = useState(false);
  const [loadingAtividades, setLoadingAtividades] = useState(false);

  const listarAtividades = async () => {
    try {
      setLoadingAtividades(true);
      const data = await buscarAtividades();
      setAtividades(data);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    } finally {
      setLoadingAtividades(false);
    }
  };

  const handleChangeAtividade = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (name === "tipo") {
      parsedValue = Number(value);
    }

    if (name === "frenteDeTrabalhoIds") {
      parsedValue = value.map(Number); // garantir array numérico
    }

    setAtividadeAtual((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const abrirCadastroAtividade = () => {
    setAtividadeAtual(atividadeInicial);
    setAtividadeModoEdicao(false);
    setAtividadeIsEditOpen(true);
  };

  const abrirEdicaoAtividade = (atividade) => {
    setAtividadeAtual(atividade);
    setAtividadeModoEdicao(true);
    setAtividadeIsEditOpen(true);
  };

  const salvarAtividade = async () => {
    try {
      setLoadingAtividades(true);
      if (atividadeModoEdicao && atividadeAtual?.id) {
        await editarAtividade(atividadeAtual.id, atividadeAtual);
      } else {
        const payload = { ...atividadeAtual, id: 0 };
        await registrarAtividade(payload);
      }
      await listarAtividades();
      setAtividadeIsEditOpen(false);
    } catch (error) {
      console.error("Erro ao salvar atividade:", error);
    } finally {
      setLoadingAtividades(false);
    }
  };

  const deletarAtividade = async (id) => {
    try {
      setLoadingAtividades(true);
      await removerAtividade(id);
      await listarAtividades();
      setAtividadeIsEditOpen(false);
    } catch (error) {
      console.error("Erro ao deletar atividade:", error);
    } finally {
      setLoadingAtividades(false);
    }
  };

  useEffect(() => {
    listarAtividades();
  }, []);

  return {
    atividades,
    atividadeAtual,
    atividadeInicial,
    atividadeIsEditOpen,
    atividadeModoEdicao,
    loadingAtividades,
    setAtividadeAtual,
    setAtividadeIsEditOpen,
    setAtividadeModoEdicao,
    listarAtividades,
    salvarAtividade,
    deletarAtividade,
    abrirCadastroAtividade,
    abrirEdicaoAtividade,
    handleChangeAtividade,
  };
};
