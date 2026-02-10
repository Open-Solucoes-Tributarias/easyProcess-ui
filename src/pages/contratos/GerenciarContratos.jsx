import { useState, useMemo, useEffect } from "react";
import { Reorder } from "framer-motion";
import {
  Heading, Icon, Input, useToast,
  Box, FormControl, FormLabel, Grid, GridItem, Text, VStack, HStack, Button,
  IconButton,
  Tooltip,
  Avatar,
  AvatarBadge,
  ListItem,
  Flex,
  List,
  FormErrorMessage,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Tag,
} from "@chakra-ui/react";
import { useContrato } from "../../hooks/useContratos";
import { useFrentes } from "../../hooks/useFrentes";
import { useAtividades } from "../../hooks/useAtividades";
import { getStatusAtividade } from "../../utils/labelUtils";
import { FaExclamationTriangle, FaHourglassHalf, FaPlus, FaRegCheckCircle, FaRegClock, FaUserTie, FaCalendarAlt, FaSync, FaPlay, FaFlagCheckered } from "react-icons/fa";
import { ChevronDownIcon, ChevronUpIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { EditAtvModal } from "../../components/EditAtvModal";
import { useAtividadesContrato } from "../../hooks/useAtividadesContrato";
import { ContratoEditModal } from "../../components/ContratoEditModal";
import { criarAtvRecorrentes, dateConverter, filterDateMonth, getCurrentMonth } from "../../utils/utils";
import { Informativo } from "../../components/Informativo";
import ContratoSelect from "../../components/ContratoSelect";

const steps = [
  { title: 'Contrato', description: 'Selecione ou crie' },
  { title: 'Frentes', description: 'Defina o escopo' },
  { title: 'Atividades', description: 'Gerencie as tarefas' },
];

export const GerenciarContratos = () => {
  //states de notificação de salvamento
  const toast = useToast({ position: 'bottom-left', isClosable: true });
  const [save, setSave] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const { contratos, listarContratos } = useContrato();
  const { frentes } = useFrentes();
  const { atividades } = useAtividades();
  const { salvarAtividadesContratoEmLote, listarAtividadesContrato, atividadesContrato } = useAtividadesContrato();

  //Data para filtro por mês
  const [dateRef, setDateRef] = useState(getCurrentMonth());

  // estado do modal de contrato
  const [isContratoOpen, setIsContratoOpen] = useState(false);
  const [contratoParaEdicao, setContratoParaEdicao] = useState(null);

  //estado do modal
  const [openModal, setOpenModal] = useState(false);
  const [contratoSelecionado, setContratoSelecionado] = useState(null);

  // ⬇️ agora é um array de ids as frentes
  const [frentesSelecionadas, setFrentesSelecionadas] = useState([]);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState({});
  const [atividadesListadas, setAtividadesListadas] = useState([]);


  // selecionar contrato
  const handleSelectContrato = (e) => {
    // Mantendo consistência, mas o componente ContratoSelect chama setContratoSelecionado diretamente?
    // O componente ContratoSelect recebe `setContratoSelecionado`.
    // Aqui estamos apenas definindo o handler se fosse um select nativo.
    // Vou deixar como está pois o ContratoSelect parece fazer o trabalho.
    const id = Number(e.target.value);
    const obj = contratos.find(c => c.id === id) || null;
    setContratoSelecionado(obj);
  };

  // Carregar atividades salvas quando selecionar um contrato
  useEffect(() => {
    if (contratoSelecionado?.id) {
      listarAtividadesContrato(contratoSelecionado.id);
      setFrentesSelecionadas([]); // Limpa seleção de visualização
    } else {
      setAtividadesListadas([]);
    }
  }, [contratoSelecionado]);

  // Atualizar lista local quando vier do backend (apenas primeira carga ou atualizações explicitas)
  useEffect(() => {
    if (atividadesContrato) {
      // Mapeia para garantir que tenham tempId se necessário (mas backend traz id)
      setAtividadesListadas(atividadesContrato);
    }
  }, [atividadesContrato]);

  // toggle de seleção da frente e geração de atividades
  const toggleFrente = (id) => {
    const isSelected = frentesSelecionadas.includes(id);
    setFrentesSelecionadas((prev) =>
      isSelected ? prev.filter((f) => f !== id) : [...prev, id]
    );

    // Se estamos selecionando (adicionando), gera as atividades e mescla
    if (!isSelected && contratoSelecionado) {
      // Buscar atividades desta frente
      const atividadesDaFrente = atividades.filter(a => {
        const fids = Array.isArray(a.frenteDeTrabalhoIds) ? a.frenteDeTrabalhoIds : [];
        return fids.includes(id);
      });

      if (atividadesDaFrente.length > 0) {
        const novasCandidatas = criarAtvRecorrentes(atividadesDaFrente, contratoSelecionado);

        setAtividadesListadas(prev => {
          // Mesclar evitando duplicatas (Mesma AtividadeID no Mesmo Dia)
          const existentes = new Set(prev.map(p => `${p.atividadeId}-${new Date(p.dataLimite).toISOString().split('T')[0]}`));

          const novasUnicas = novasCandidatas.filter(nc =>
            !existentes.has(`${nc.atividadeId}-${new Date(nc.dataLimite).toISOString().split('T')[0]}`)
          );

          return [...prev, ...novasUnicas].map((item, i) => ({ ...item, sequencia: i }));
        });
      }
    } else if (isSelected) {
      // REMOVING logic
      setAtividadesListadas(prev =>
        prev.filter(atv => {
          // Smart Remove:
          // Keep if: Activity does NOT belong to removed ID 
          //          OR (Belongs to removed ID AND Belongs to another Selected ID)

          const atvFeds = Array.isArray(atv.frenteDeTrabalhoIds) ? atv.frenteDeTrabalhoIds : [];

          if (!atvFeds.includes(id)) return true; // Não pertence a frente removida, mantem.

          // Pertence a frente removida. Verifca se pertence a outra frente ainda selecionada.
          const remainingFrentes = frentesSelecionadas.filter(f => f !== id);
          return atvFeds.some(fid => remainingFrentes.includes(fid));
        }).map((item, i) => ({ ...item, sequencia: i }))
      );
    }
  };

  // utilidades (opcional)
  const limparSelecao = () => setFrentesSelecionadas([]);
  const selecionarTodas = () => {
    // Implementar lógica de adicionar todas se necessário, ou apenas visual?
    // Pelo padrão novo, selecionar todas deveria gerar todas.
    // Vamos simplificar e iterar.
    if (!frentes) return;
    frentes.forEach(f => {
      if (!frentesSelecionadas.includes(f.id)) toggleFrente(f.id);
    });
  };

  // Funcao effect anterior REMOVIDA para evitar overwrite bruto.
  // Mantemos apenas a função handleEditAtv abaixo.

  ///abrir modal para editar
  const handleEditAtv = (atv) => {
    setAtividadeSelecionada(atv);
    setOpenModal(true);
  }

  // funcao para pegar atv editada no modal e ataulizar no array

  //***existe uma limitação na edição de atividades recorrentes, quando são editadas, não existe um identificador unico alem da data para para identificar quais delas são salvar
  // atual ao salvar uma recorrente, todas terão a mesma informações neste momento, se indica então fazer o controle pelo painel de controle******
  const handleSalvarAtv = (atvEditada) => {
    setAtividadesListadas(prev => {
      const exists = prev.some(atv =>
        (atvEditada.id > 0 && atv.id === atvEditada.id) ||
        (atvEditada.tempId && atv.tempId === atvEditada.tempId)
      );

      if (exists) {
        return prev.map(atv => {
          if (atvEditada.id > 0 && atv.id === atvEditada.id) return atvEditada;
          if (atvEditada.tempId && atv.tempId === atvEditada.tempId) return atvEditada;
          return atv;
        });
      } else {
        // Inserção: Avulsa
        if (atvEditada.tipo === 2) {
          // Recorrente: Gera múltiplas instâncias
          const template = {
            ...atvEditada,
            nome: atvEditada.descricaoCustomizada,
            proximaExecucao: atvEditada.dataLimite
          };
          const novas = criarAtvRecorrentes([template], contratoSelecionado);

          const startSeq = prev.length;
          const novasComSeq = novas.map((n, i) => ({
            ...n,
            sequencia: startSeq + i,
            atividadeId: 0,
            descricaoCustomizada: atvEditada.descricaoCustomizada,
            statusAtividade: 0
          }));

          return [...prev, ...novasComSeq];
        } else {
          // Única
          return [...prev, { ...atvEditada, sequencia: prev.length }];
        }
      }
    });
  };

  const handleCriarAvulsa = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const nova = {
      id: 0,
      contratoId: contratoSelecionado?.id || 0,
      atividadeId: 0,
      tempId: Date.now(),
      descricaoCustomizada: '',
      tipo: 1, // Avulsa
      frenteDeTrabalhoIds: [],
      dataLimite: new Date().toISOString(),
      statusAtividade: 0,
      sequencia: atividadesListadas.length,
      nomeUsuarioDelegado: '',
      avatarUsuarioDelegado: ''
    };
    handleEditAtv(nova);
  };
  //remover uma atividade com base no seu id
  const handleRemoverAtv = (atvParaRemover) => {
    setAtividadesListadas(prev =>
      prev.filter(atv => {
        if (atvParaRemover.id > 0) return atv.id !== atvParaRemover.id;
        if (atvParaRemover.tempId) return atv.tempId !== atvParaRemover.tempId;
        // Fallback inseguro, melhor não remover se não tiver ID
        return true;
      }).map((item, i) => ({ ...item, sequencia: i }))
    );
  };

  //movimentação de objetos no array atividadeslistadas
  const reorder = (list, from, to) => {
    const next = [...list];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next.map((item, i) => ({ ...item, sequencia: i }));
  };

  // direcao: "up" | "down"
  const move = (index, direction) => {
    setAtividadesListadas(prev => {
      const delta = direction === "up" ? -1 : 1;
      const to = index + delta;

      // bordas
      if (to < 0 || to >= prev.length) return prev;

      return reorder(prev, index, to);
    });
  };

  const abrirCriacaoContrato = () => {
    setContratoParaEdicao(null);   // null => criação
    setIsContratoOpen(true);
  };

  const abrirEdicaoContrato = () => {
    const idSel = Number(contratoSelecionado?.id) || 0;
    if (!idSel) return;
    const c = contratos.find(c => c.id === idSel);
    if (!c) return;
    setContratoParaEdicao(c);
    setIsContratoOpen(true);
  };

  //filtro de data para o array das atividades criadas
  const listaFiltradaAtividades = filterDateMonth(atividadesListadas, dateRef).filter(atv => {
    if (!searchTerm) return true;
    return atv.descricaoCustomizada?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getNomeFrente = (ids) => {
    if (!ids || !ids.length || !frentes) return null;
    // Pega a primeira frente encontrada (assumindo que atividade herda de uma principal)
    // Se for array de números:
    const id = Array.isArray(ids) ? ids[0] : ids;
    const f = frentes.find(item => item.id === Number(id));
    return f ? f.nome : null;
  };

  const handleNext = () => {
    if (activeStep === 0 && !contratoSelecionado) {
      toast({ title: 'Selecione um contrato', status: 'warning' });
      return;
    }
    if (activeStep === 1 && frentesSelecionadas.length === 0) {
      toast({ title: 'Selecione pelo menos uma frente', status: 'warning' });
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Box w="100%" px={4} py={6}>
      <Stepper index={activeStep} mb={8} colorScheme="green">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {/* STEP 0: CONTRATO */}
      {activeStep === 0 && (
        <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px" borderColor="gray.200">
          <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
            <Box flex="1" minW="300px">
              <FormLabel mb={1} color="gray.600" fontSize="sm">Contrato Vigente</FormLabel>
              <ContratoSelect
                contratos={contratos}
                contratoSelecionado={contratoSelecionado}
                setContratoSelecionado={setContratoSelecionado}
              />
            </Box>
            <Button
              colorScheme="green"
              leftIcon={<FaPlus />}
              onClick={() => { contratoSelecionado ? abrirEdicaoContrato() : abrirCriacaoContrato() }}
            >
              {contratoSelecionado ? 'Editar Contrato' : 'Novo Contrato'}
            </Button>
          </Flex>

          {contratoSelecionado && (
            <VStack align="start" spacing={4} p={5} bg="gray.50" borderRadius="md" border="1px" borderColor="gray.200">
              <Flex gap={3} align="center" wrap="wrap">
                <Heading size="md" color="gray.700">{contratoSelecionado.descricao}</Heading>
                {contratoSelecionado.cliente && (
                  <Tag size="md" variant="solid" colorScheme="blue">
                    {contratoSelecionado.cliente.razaoSocial}
                  </Tag>
                )}
              </Flex>
              <HStack spacing={6} wrap="wrap">
                <HStack>
                  <Icon as={FaUserTie} color="gray.500" />
                  <Text fontSize="sm">Supervisor: <b>{contratoSelecionado.nomeSupervisor || "N/D"}</b></Text>
                </HStack>
                <HStack>
                  <Icon as={FaCalendarAlt} color="gray.500" />
                  <Text fontSize="sm">Vigência: <b>{dateConverter(contratoSelecionado.dataInicio)} até {dateConverter(contratoSelecionado.dataFim)}</b></Text>
                </HStack>
              </HStack>
            </VStack>
          )}
        </Box>
      )}

      {/* STEP 1: FRENTES */}
      {activeStep === 1 && (
        <Box>
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold" color="gray.700">Selecione as Frentes de Trabalho</Text>
            <HStack>
              <Button size="sm" variant="ghost" onClick={limparSelecao}>Limpar</Button>
              <Button size="sm" variant="outline" onClick={selecionarTodas}>Selecionar Todas</Button>
            </HStack>
          </Flex>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
            {frentes?.map((ft) => {
              const isActive = frentesSelecionadas.includes(ft.id);
              return (
                <Box
                  key={ft.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={() => toggleFrente(ft.id)}
                  bg={isActive ? "green.50" : "white"}
                  borderColor={isActive ? "green.400" : "gray.200"}
                  _hover={{ shadow: "md", borderColor: "green.300" }}
                  transition="all 0.2s"
                >
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold" color={isActive ? "green.700" : "gray.600"}>{ft.nome}</Text>
                    {isActive && <Icon as={FaRegCheckCircle} color="green.500" />}
                  </Flex>
                </Box>
              )
            })}
          </Grid>
          {!frentes?.length && <Text color="gray.500">Nenhuma frente cadastrada.</Text>}
        </Box>
      )}

      {/* STEP 2: ATIVIDADES */}
      {activeStep === 2 && (
        <Box>
          <Flex justify="space-between" align="center" mb={4} gap={4} wrap="wrap">
            <Box flex="1">
              <Input
                placeholder="Pesquisar atividade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="white"
              />
            </Box>
            <Input
              width="200px"
              type="month"
              value={dateRef}
              onChange={(e) => setDateRef(e.target.value)}
              bg="white"
            />
            <Button
              type="button"
              leftIcon={<Icon as={FaPlus} />}
              colorScheme="blue"
              onClick={handleCriarAvulsa}
            >
              Nova Atividade
            </Button>
          </Flex>

          <Box>
            {listaFiltradaAtividades?.length ? (
              <VStack spacing={6} align="stretch">
                {Object.entries(
                  listaFiltradaAtividades.reduce((acc, atv) => {
                    const d = new Date(atv.dataLimite);
                    // Use UTC to avoid timezone shifts if simpler, or local as per Control Panel
                    const dateLabel = d.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                    if (!acc[dateLabel]) acc[dateLabel] = [];
                    acc[dateLabel].push(atv);
                    return acc;
                  }, {})
                ).sort((a, b) => {
                  // Sort groups by date of first item
                  const dateA = new Date(a[1][0].dataLimite);
                  const dateB = new Date(b[1][0].dataLimite);
                  return dateA - dateB;
                }).map(([dateLabel, groupItems]) => (
                  <Box key={dateLabel}>
                    {/* Date Header */}
                    <Flex align="center" mb={2} px={2}>
                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        color="blue.600"
                        textTransform="capitalize"
                        mr={3}
                      >
                        {dateLabel}
                      </Text>
                      <Box flex="1" h="1px" bg="gray.300" />
                    </Flex>

                    {/* Group List */}
                    <Reorder.Group
                      axis="y"
                      values={groupItems}
                      onReorder={(newGroupOrder) => {
                        // 1. Identify items not in this group (keep them as is)
                        // Warning: This logic assumes integrity of 'id'/'tempId'
                        const otherItems = atividadesListadas.filter(a =>
                          !groupItems.some(g => (g.id === a.id && g.id > 0) || (g.tempId && g.tempId === a.tempId))
                        );

                        // 2. Merge: Others + NewGroupOrder
                        // To preserve overall list order (Group A then Group B...), we need to be careful.
                        // Actually, simplest is to just swap the items in the global list with the new ones?
                        // Better: Reconstruct the global list based on the visual groups?
                        // If we have Group A, Group B. User reorders Group A.
                        // Global List = [Group A Items (New Order), Group B Items (Original Order)]
                        // But we need to filter `atividadesListadas` which might have items not in current view (month filter).
                        // If `atividadesListadas` corresponds to `listaFiltradaAtividades` (view), we can merge.

                        // Let's rely on mapping IDs.

                        setAtividadesListadas(prev => {
                          const next = [...prev];

                          // Update items from this group with new sequences?
                          // Actually, 'newGroupOrder' is just an array of items.
                          // We need to update their positions in 'next'.
                          // Issue: 'next' is the Source of Truth.
                          // If we just update 'sequencia' based on current view structure:

                          // Strategy:
                          // 1. Find indices of groupItems in 'next'.
                          // 2. Replace them with newGroupOrder items?
                          // 3. Re-calculate sequence globally?

                          // Simplified approach:
                          // Update 'next' items to match 'newGroupOrder' data (if modified).
                          // But reordering implies changing the array order.

                          // Let's simplify: Update the state to reflect the visual change for THIS group.
                          // We swap the objects in the main array?

                          // Correct way with Reorder.Group per group is hard because 'values' is a subset.
                          // We need to manually Construct the new global array.
                          // Filter out the old group items from 'next'.
                          // Insert 'newGroupOrder' items?
                          // Where? They might be scattered in 'next' if not sorted.
                          // If we assume 'next' is sorted by sequence...

                          // Fix: Just update the sequence numbers and sort 'next'.
                          // Within this group, assign sequences X, X+1, X+2...
                          // But what is X? The sequence of the first item?
                          // 'groupItems' (original) had sequences S1, S2, S3.
                          // 'newGroupOrder' should take those sequences S1, S2, S3 in their new order.

                          const originalSequences = groupItems.map(i => i.sequencia).sort((a, b) => a - b);
                          const updatedGroupItems = newGroupOrder.map((item, idx) => ({
                            ...item,
                            sequencia: originalSequences[idx]
                          }));

                          updatedGroupItems.forEach(modItem => {
                            const idx = next.findIndex(n =>
                              (n.id > 0 && n.id === modItem.id) ||
                              (n.tempId && n.tempId === modItem.tempId)
                              // || (n.id === 0 && !n.tempId && n === modItem)
                            );
                            if (idx !== -1) next[idx] = modItem;
                          });

                          return next.sort((a, b) => a.sequencia - b.sequencia);
                        });
                      }}
                      style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}
                    >
                      {groupItems.map((atv, index) => {
                        const isNew = atv.id === 0;
                        const uniqueKey = atv.id > 0 ? (atv.id).toString() : (atv.tempId || `idx-${index}`);

                        return (
                          <Reorder.Item
                            key={uniqueKey}
                            value={atv}
                            dragListener={!searchTerm}
                            style={{ cursor: searchTerm ? 'default' : 'grab' }}
                          >
                            <Box
                              bg="white"
                              p={3}
                              borderRadius="lg"
                              border="1px solid"
                              borderColor="gray.200"
                              borderLeftWidth="4px"
                              borderLeftColor={isNew ? "green.400" : "blue.400"}
                              shadow="sm"
                              _hover={{ shadow: "md" }}
                              transition="all 0.2s"
                            >
                              <Flex justify="space-between" align="center">
                                <HStack spacing={4}>
                                  <Tooltip label={getStatusAtividade(atv?.statusAtividade)} placement="top">
                                    <Box>
                                      {atv.statusAtividade === 0 ? <Icon as={FaRegClock} color="gray.400" /> :
                                        atv.statusAtividade === 1 ? <Icon as={FaHourglassHalf} color="orange.400" /> :
                                          atv.statusAtividade === 2 ? <Icon as={FaRegCheckCircle} color="green.500" /> :
                                            <Icon as={FaExclamationTriangle} color="red.500" />}
                                    </Box>
                                  </Tooltip>

                                  <VStack align="start" spacing={0}>
                                    <HStack>
                                      <Text fontWeight="bold" color="gray.700">{atv.descricaoCustomizada}</Text>
                                      {atv.tipo === 2 && (
                                        <Tooltip label="Atividade Recorrente">
                                          <span><Icon as={FaSync} color="purple.400" boxSize={3} /></span>
                                        </Tooltip>
                                      )}
                                      {Array.isArray(atv.frenteDeTrabalhoIds) && (
                                        <Tag size="sm" colorScheme="purple" variant="subtle">
                                          {getNomeFrente(atv.frenteDeTrabalhoIds)}
                                        </Tag>
                                      )}
                                    </HStack>
                                    <Text fontSize="xs" color="gray.500">
                                      {isNew ? "Nova atividade" : `Atividade já cadastrada no contrato`}
                                    </Text>
                                  </VStack>
                                </HStack>

                                <HStack>
                                  <Tooltip label="Responsável" placement="top">
                                    <Avatar size="xs" name={atv.nomeUsuarioDelegado} src={atv.avatarUsuarioDelegado}>
                                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                                    </Avatar>
                                  </Tooltip>

                                  <IconButton
                                    icon={<EditIcon />}
                                    size="sm"
                                    variant="ghost"
                                    colorScheme="blue"
                                    onClick={() => handleEditAtv(atv)}
                                    aria-label="Editar"
                                  />

                                  <IconButton
                                    icon={<CloseIcon />}
                                    size="sm"
                                    variant="ghost"
                                    colorScheme="red"
                                    onClick={() => handleRemoverAtv(atv)}
                                    aria-label="Remover"
                                  />
                                </HStack>
                              </Flex>
                            </Box>
                          </Reorder.Item>
                        );
                      })}
                    </Reorder.Group>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Informativo
                titulo="Nenhuma atividade encontrada"
                mensagem={searchTerm ? "Nenhum resultado para a pesquisa." : "Selecione frentes para gerar atividades ou mude o mês."}
              />
            )}
          </Box>
        </Box>
      )}

      {/* FOOTER ACTIONS */}
      <Flex mt={8} justify="space-between" borderTop="1px" borderColor="gray.100" pt={4}>
        <Button
          isDisabled={activeStep === 0}
          onClick={handleBack}
          variant="ghost"
        >
          Voltar
        </Button>

        {activeStep < 2 ? (
          <Button colorScheme="green" onClick={handleNext}>
            Próximo
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            isLoading={save}
            loadingText="Salvando..."
            onClick={async () => {
              setSave(true);
              try {
                const { sucesso = [], falhas = [] } = await salvarAtividadesContratoEmLote(atividadesListadas);
                toast({
                  status: falhas.length ? 'warning' : 'success',
                  title: falhas.length
                    ? `Salvo parcialmente. ${falhas.length} falhas.`
                    : 'Todas as atividades salvas com sucesso!',
                });
              } catch {
                toast({ status: 'error', title: 'Erro ao salvar' });
              } finally {
                setSave(false);
              }
            }}
          >
            Salvar Alterações
          </Button>
        )}
      </Flex>

      {/* MODALS */}
      <EditAtvModal
        open={openModal}
        setOpen={setOpenModal}
        atvSelecionada={atividadeSelecionada}
        onConfirm={handleSalvarAtv}
      />
      <ContratoEditModal
        isOpen={isContratoOpen}
        onClose={() => setIsContratoOpen(false)}
        contrato={contratoParaEdicao}
        onSaved={() => listarContratos(null, true)}
      />
    </Box>
  );
};
