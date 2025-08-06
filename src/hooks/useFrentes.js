import { useEffect, useState } from "react";
import {
  buscarFrentes,
  registrarFrente,
  editarFrente,
  removerFrente,
} from "../services/frentesTrabalho";

const empresaId = JSON.parse(localStorage.getItem("user"))?.empresaId;

export const frenteInicial = {
  id: 0,
  nome: "",
  empresaId: empresaId,
};

export const useFrentes = () => {
  const [frentes, setFrentes] = useState([]);
  const [frenteAtual, setFrenteAtual] = useState(frenteInicial);
  const [frenteIsEditOpen, setFrenteIsEditOpen] = useState(false);
  const [frenteModoEdicao, setFrenteModoEdicao] = useState(false);
  const [loadingFrentes, setLoadingFrentes] = useState(false);

  const listarFrentes = async () => {
    try {
      setLoadingFrentes(true);
      const data = await buscarFrentes();
      setFrentes(data);
    } catch (error) {
      console.error("Erro ao buscar frentes:", error);
    } finally {
      setLoadingFrentes(false);
    }
  };

  const handleChangeFrente = (e) => {
    const { name, value } = e.target;
    setFrenteAtual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const frenteAbrirCadastro = () => {
    setFrenteAtual(frenteInicial);
    setFrenteModoEdicao(false);
    setFrenteIsEditOpen(true);
  };

  const frenteAbrirEdicao = (frente) => {
    setFrenteAtual(frente);
    setFrenteModoEdicao(true);
    setFrenteIsEditOpen(true);
  };

  const salvarFrente = async () => {
    try {
      setLoadingFrentes(true);
      if (frenteModoEdicao && frenteAtual?.id) {
        await editarFrente(frenteAtual?.id, frenteAtual);
      } else {
        const payload = { ...frenteAtual, id: 0 };
        await registrarFrente(payload);
      }
      await listarFrentes();
      setFrenteIsEditOpen(false);
    } catch (error) {
      console.error("Erro ao salvar frente:", error);
    } finally {
      setLoadingFrentes(false);
    }
  };

  const deletarFrente = async (id) => {
    try {
      setLoadingFrentes(true);
      await removerFrente(id);
      setFrenteIsEditOpen(false);
      await listarFrentes();
    } catch (error) {
      console.error("Erro ao remover frente:", error);
    } finally {
      setLoadingFrentes(false);
    }
  };

  useEffect(() => {
    listarFrentes();
  }, []);

  return {
    frentes,
    frenteAtual,
    frenteInicial,
    frenteIsEditOpen,
    frenteModoEdicao,
    loadingFrentes,
    setFrenteAtual,
    setFrenteIsEditOpen,
    setFrenteModoEdicao,
    listarFrentes,
    salvarFrente,
    deletarFrente,
    frenteAbrirCadastro,
    frenteAbrirEdicao,
    handleChangeFrente,
  };
};
