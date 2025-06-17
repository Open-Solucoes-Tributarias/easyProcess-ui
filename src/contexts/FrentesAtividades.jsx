import { createContext, useContext, useState } from "react";
import {
    buscarFrentesAtv,
    registrarFrenteAtv,
    removerFrenteAtv,
} from "../services/frenteTrabalhoAtv";

const FrenteDeTrabalhoAtvContext = createContext();

const frenteAtvInicial = {
    id: 0,
    frenteDeTrabalhoId: 0,
    atividadeId: 0,
    sequencia: 0,
};

export const FrenteDeTrabalhoAtvProvider = ({ children }) => {
    const [frentesAtv, setFrentesAtv] = useState([]);
    const [frenteAtvAtual, setFrenteAtvAtual] = useState(frenteAtvInicial);
    const [frenteAtvIsEditOpen, setFrenteAtvIsEditOpen] = useState(false);
    const [frenteAtvModoEdicao, setFrenteAtvModoEdicao] = useState(false);
    const [loadingFrenteAtv, setLoadingFrenteAtv] = useState(false);

    const listarFrentesAtv = async (frenteId) => {
        try {
            setLoadingFrenteAtv(true);
            const data = await buscarFrentesAtv(frenteId);
            setFrentesAtv(data);
        } catch (error) {
            console.error("Erro ao buscar frentes de trabalho com atividades:", error);
        } finally {
            setLoadingFrenteAtv(false);
        }
    };

    const handleChangeFrenteAtv = (e) => {
        const { name, value } = e.target;
        setFrenteAtvAtual((prev) => ({
            ...prev,
            [name]: name === 'atividadeIds' ? value.map(Number) : Number(value),
        }));
    };

    const frenteAtvAbrirCadastro = (frenteDeTrabalhoId) => {
        setFrenteAtvAtual({
            ...frenteAtvInicial,
            frenteDeTrabalhoId,
        });
        setFrenteAtvModoEdicao(false);
        setFrenteAtvIsEditOpen(true);
    };

    const frenteAtvAbrirEdicao = async (frente) => {
  const atividadesVinculadas = await listarFrentesAtv(frente.id);
  const atividadeIds = atividadesVinculadas.map((item) => item.atividadeId);

  frenteAbrirEdicao({
    ...frente,
    atividadeIds,
  });
};
    

    // const frenteAtvAbrirEdicao = (frenteAtv) => {
    //     setFrenteAtvAtual(frenteAtv);
    //     setFrenteAtvModoEdicao(true);
    //     setFrenteAtvIsEditOpen(true);
    // };

    const salvarFrenteAtv = async () => {
        try {
            setLoadingFrenteAtv(true);
            const payload = { ...frenteAtvAtual, id: 0 };
            await registrarFrenteAtv(payload);
            await listarFrentesAtv(frenteAtvAtual.frenteDeTrabalhoId);
            setFrenteAtvIsEditOpen(false);
        } catch (error) {
            console.error("Erro ao salvar vínculo frente-atividade:", error);
        } finally {
            setLoadingFrenteAtv(false);
        }
    };

    const deletarFrenteAtv = async (id, frenteDeTrabalhoId) => {
        try {
            setLoadingFrenteAtv(true);
            await removerFrenteAtv(id);
            await listarFrentesAtv(frenteDeTrabalhoId);
            setFrenteAtvIsEditOpen(false);
        } catch (error) {
            console.error("Erro ao remover vínculo frente-atividade:", error);
        } finally {
            setLoadingFrenteAtv(false);
        }
    };

    const atribuirMultiplasAtividades = async (frenteDeTrabalhoId, atividadeIds = []) => {
        try {
            setLoadingFrenteAtv(true);
            const promises = atividadeIds.map((atividadeId, idx) =>
                registrarFrenteAtv({
                    id: 0,
                    frenteDeTrabalhoId,
                    atividadeId,
                    sequencia: idx + 1, // ou outra lógica de ordenação
                })
            );
            await Promise.all(promises);
            await listarFrentesAtv(frenteDeTrabalhoId);
        } catch (error) {
            console.error("Erro ao atribuir múltiplas atividades:", error);
        } finally {
            setLoadingFrenteAtv(false);
        }
    };

    return (
        <FrenteDeTrabalhoAtvContext.Provider
            value={{
                frentesAtv,
                frenteAtvAtual,
                frenteAtvInicial,
                frenteAtvIsEditOpen,
                frenteAtvModoEdicao,
                loadingFrenteAtv,
                setFrenteAtvAtual,
                setFrenteAtvIsEditOpen,
                setFrenteAtvModoEdicao,
                listarFrentesAtv,
                salvarFrenteAtv,
                deletarFrenteAtv,
                frenteAtvAbrirCadastro,
                frenteAtvAbrirEdicao,
                handleChangeFrenteAtv,
                atribuirMultiplasAtividades,
            }}
        >
            {children}
        </FrenteDeTrabalhoAtvContext.Provider>
    );
};

export const useFrenteDeTrabalhoAtv = () =>
    useContext(FrenteDeTrabalhoAtvContext);
