import { createContext, useContext, useState } from "react";
import {
   buscarMovimentacoesAtv,
} from "../services/movimentacoesAtvService";
import {
  registrarControleAtv
} from "../services/controleAtvService";

const ControleAtividadesContext = createContext();

export const controleAtvInicial = {
  atividadeContratoId: 0,
  dataHora: "",
  observacao: "",
  anexo: ""
};

export const ControleAtividadesProvider = ({ children }) => {
  const [movimentacoesAtv, setMovimentacoesAtv] = useState([]);
  const [controleAtv, setControleAtv] = useState(controleAtvInicial);
  const [controleLoading, setControleLoading] = useState(false);

  const listarMovimentacoesAtividade = async (atividadeContratoId) => {
    try {
      setControleLoading(true);
      const data = await buscarMovimentacoesAtv(atividadeContratoId);
      setMovimentacoesAtv(data);
    } catch (error) {
      console.error("Erro ao buscar movimentações da atividade:", error);
    } finally {
      setControleLoading(false);
    }
  };

  const salvarControleAtividade = async () => {
    try {
      setControleLoading(true);
      const payload = {
        ...controleAtv,
        id: 0 // força novo registro
      };
      await registrarControleAtv(payload);
      await listarMovimentacoesAtividade(controleAtv.atividadeContratoId);
      setControleAtv({ ...controleAtvInicial, atividadeContratoId: controleAtv.atividadeContratoId });
    } catch (error) {
      console.error("Erro ao registrar controle de atividade:", error);
    } finally {
      setControleLoading(false);
    }
  };

  const handleChangeControle = (e) => {
    const { name, value } = e.target;
    setControleAtv((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ControleAtividadesContext.Provider
      value={{
        controleAtv,
        setControleAtv,
        controleLoading,
        movimentacoesAtv,
        listarMovimentacoesAtividade,
        salvarControleAtividade,
        handleChangeControle,
        controleAtvInicial
      }}
    >
      {children}
    </ControleAtividadesContext.Provider>
  );
};

export const useControleAtividades = () => useContext(ControleAtividadesContext);
