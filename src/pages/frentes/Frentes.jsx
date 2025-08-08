import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Spinner,
  Text,
  Tooltip,
  useToast,
  Switch,
  VStack,
  IconButton,
} from "@chakra-ui/react";

import { useFrentes } from "../../hooks/useFrentes";
import { useAtividades } from "../../hooks/useAtividades";

// importe o serviço diretamente (igual no hook useAtividades)
import { editarAtividade } from "../../services/atividadesService";
import { FaSync } from "react-icons/fa";

export const Frentes = () => {
  const toast = useToast();

  const { frentes, loadingFrentes, listarFrentes } = useFrentes();
  const { atividades, loadingAtividades, listarAtividades } = useAtividades();

  const [frenteSelecionadaId, setFrenteSelecionadaId] = useState(null);

  // state com seleções (atividadeId -> bool) para a frente selecionada
  const [selecionadas, setSelecionadas] = useState({});
  // snapshot para comparar o que mudou (evita update desnecessário)
  const [snapshotSelecionadas, setSnapshotSelecionadas] = useState({});

  // mostrar apenas as atividades que já pertencem à frente ou todas
  const [mostrarTodasAtividades, setMostrarTodasAtividades] = useState(false);

  // quando carregar listas inicialmente, define frente padrão (primeira)
  useEffect(() => {
    if (!loadingFrentes && frentes?.length && frenteSelecionadaId == null) {
      setFrenteSelecionadaId(frentes[0].id);
    }
  }, [loadingFrentes, frentes, frenteSelecionadaId]);

  // sempre que trocar de frente OU recarregar atividades,
  // recalcula o mapa de seleção baseado no campo frenteDeTrabalhoIds.
  useEffect(() => {
    if (!frenteSelecionadaId || !atividades?.length) {
      setSelecionadas({});
      setSnapshotSelecionadas({});
      return;
    }

    const novoMapa = {};
    atividades.forEach((atv) => {
      const ids = Array.isArray(atv?.frenteDeTrabalhoIds) ? atv.frenteDeTrabalhoIds : [];
      novoMapa[atv.id] = ids.includes(frenteSelecionadaId);
    });

    setSelecionadas(novoMapa);
    setSnapshotSelecionadas(novoMapa);
  }, [frenteSelecionadaId, atividades]);

  const loading = loadingFrentes || loadingAtividades;

  // lista filtrada conforme o toggle "mostrar todas"
  const atividadesFiltradas = useMemo(() => {
    if (!atividades?.length || !frenteSelecionadaId) return [];
    if (mostrarTodasAtividades) return atividades;

    // mostrar somente as que já possuem a frente
    return atividades.filter((atv) =>
      Array.isArray(atv?.frenteDeTrabalhoIds) &&
      atv.frenteDeTrabalhoIds.includes(frenteSelecionadaId)
    );
  }, [atividades, frenteSelecionadaId, mostrarTodasAtividades]);

  const handleToggleAtividade = (atividadeId) => {
    setSelecionadas((prev) => ({
      ...prev,
      [atividadeId]: !prev[atividadeId],
    }));
  };

  const handleSalvar = async () => {
    if (!frenteSelecionadaId) return;

    // descobrir o que mudou
    const mudouIds = Object.keys(selecionadas).filter(
      (id) => selecionadas[id] !== snapshotSelecionadas[id]
    );

    if (!mudouIds.length) {
      toast({
        title: "Nada para salvar",
        status: "info",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    try {
      // atualiza apenas as que mudaram
      await Promise.all(
        mudouIds.map(async (idStr) => {
          const id = Number(idStr);
          const atividadeOriginal = atividades.find((a) => a.id === id);
          if (!atividadeOriginal) return;

          const atualJaTem =
            Array.isArray(atividadeOriginal.frenteDeTrabalhoIds) &&
            atividadeOriginal.frenteDeTrabalhoIds.includes(frenteSelecionadaId);

          let novoArray = Array.isArray(atividadeOriginal.frenteDeTrabalhoIds)
            ? [...atividadeOriginal.frenteDeTrabalhoIds]
            : [];

          const deveTer = selecionadas[idStr] === true;

          if (deveTer && !atualJaTem) {
            novoArray.push(frenteSelecionadaId);
          } else if (!deveTer && atualJaTem) {
            novoArray = novoArray.filter((fid) => fid !== frenteSelecionadaId);
          }

          // monta payload preservando o resto dos campos
          const payload = {
            ...atividadeOriginal,
            frenteDeTrabalhoIds: novoArray,
          };

          await editarAtividade(atividadeOriginal.id, payload);
        })
      );

      // recarrega listas e reseta snapshot
      await listarAtividades();
      toast({
        title: "Atividades atualizadas",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro ao salvar",
        description: "Tente novamente em alguns instantes.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="row" gap={4} justifyContent="space-between" p={5}>
      {/* Esquerda: Frentes */}
      <Flex direction="column" w="35%" gap={3}>
        <HStack justify="space-between">
                  <Text fontWeight={800}>Frentes de trabalho</Text>
                  <IconButton size='sm' variant='ghost' onClick={listarFrentes}>
                      <FaSync />
                  </IconButton>
              </HStack>

        {loading ? (
          <Spinner />
        ) : (
          <VStack align="stretch" spacing={3}>
            {frentes?.map((ft) => {
              const isActive = frenteSelecionadaId === ft.id;
              return (
                <Box
                  key={ft.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={() => setFrenteSelecionadaId(ft.id)}
                  bg={isActive ? "blue.50" : "white"}
                  borderColor={isActive ? "blue.400" : "gray.200"}
                  _hover={{ shadow: "md" }}
                >
                  <Text fontWeight={700}>{ft?.nome}</Text>                 
                </Box>
              );
            })}
            {!frentes?.length && (
              <Text color="gray.500">Nenhuma frente cadastrada.</Text>
            )}
          </VStack>
        )}
      </Flex>

      {/* Direita: Atividades */}
      <Flex direction="column" w="60%" gap={3}>
        <HStack justify="space-between" align="center">
          <Text fontWeight={800}>
            Atividades
          </Text>
          <HStack>
            <Tooltip label="Exibe todas as atividades para permitir incluir/remover da frente selecionada">
              <HStack>
                <Text fontSize="sm">Mostrar todas</Text>
                <Switch
                  isChecked={mostrarTodasAtividades}
                  onChange={(e) => setMostrarTodasAtividades(e.target.checked)}
                />
              </HStack>
            </Tooltip>
            <IconButton size='sm' variant='ghost' onClick={listarAtividades}>
                <FaSync />
            </IconButton>
          </HStack>
        </HStack>

        {loading ? (
          <Spinner />
        ) : (
          <VStack align="stretch" spacing={2} maxH="65vh" overflowY="auto" p={2} borderWidth="1px" borderRadius="lg">
            {atividadesFiltradas?.map((atv) => {
              const checked = !!selecionadas[atv.id]; // true se pertence à frente
              return (
                <HStack
                  key={atv.id}
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  justify="space-between"
                >
                  <VStack align="start" spacing={0}>
                    <Text fontWeight={600}>{atv?.nome}</Text>                    
                  </VStack>

                  <Checkbox
                    isChecked={checked}
                    onChange={() => handleToggleAtividade(atv.id)}
                  >
                    Vinculada à frente
                  </Checkbox>
                </HStack>
              );
            })}

            {!atividadesFiltradas?.length && (
              <Text color="gray.500">
                {mostrarTodasAtividades
                  ? "Nenhuma atividade cadastrada."
                  : "Nenhuma atividade vinculada a esta frente."}
              </Text>
            )}
          </VStack>
        )}

        <HStack justify="flex-end">
          <Button colorScheme="blue" onClick={handleSalvar} isDisabled={!frenteSelecionadaId || loading}>
            Salvar alterações
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};
