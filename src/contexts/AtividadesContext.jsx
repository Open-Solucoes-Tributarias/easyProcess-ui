import { createContext, useContext, useEffect, useState } from "react";
import {
  buscarAtividades,
  registrarAtividade,
  editarAtividade,
  removerAtividade,
} from "../services/atividadesService";

const AtividadesContext = createContext();

const empresaId = JSON.parse(localStorage.getItem("user"))?.empresaId;

const atividadeInicial = {
  id: 0,
  nome: "",
  tipo: 0,
  recorrencia: 0,
  empresaId: empresaId,
  instrucao: "",
  frenteDeTrabalhoIds: [],
};

export const AtividadesProvider = ({ children }) => {
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
    setAtividadeAtual((prev) => ({
      ...prev,
      [name]: value,
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

  return (
    <AtividadesContext.Provider
      value={{
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
      }}
    >
      {children}
    </AtividadesContext.Provider>
  );
};

export const useAtividades = () => useContext(AtividadesContext);
