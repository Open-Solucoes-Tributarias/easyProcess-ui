import { useState, useMemo, useEffect } from "react";
import {
  Box, FormControl, FormLabel, Grid, GridItem, Select, Text, VStack, HStack, Button,
  IconButton,
  Tooltip,
  Avatar,
  AvatarBadge,
  ListItem,
  Flex,
  List,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useContrato } from "../../hooks/useContratos";
import { useFrentes } from "../../hooks/useFrentes";
import { useAtividades } from "../../hooks/useAtividades";
import { getStatusAtividade } from "../../utils/labelUtils";
import { FaExclamationTriangle, FaHourglassHalf, FaPlus, FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { ChevronDownIcon, ChevronUpIcon, CloseIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import { EditAtvModal } from "../../components/EditAtvModal";
import { useAtividadesContrato } from "../../hooks/useAtividadesContrato";
import { ContratoEditModal } from "../../components/ContratoEditModal";

export const GerenciarContratos = () => {
  const { contratos, listarContratos } = useContrato();
  const { frentes } = useFrentes();
  const { atividades } = useAtividades();
  const { salvarAtividadesContratoEmLote } = useAtividadesContrato();

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
    const id = Number(e.target.value);
    const obj = contratos.find(c => c.id === id) || null;
    setContratoSelecionado(obj);
  };

  console.log('contrato selecionado no state', contratoSelecionado)

  // toggle de seleção da frente
  const toggleFrente = (id) => {
    setFrentesSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // utilidades (opcional)
  const limparSelecao = () => setFrentesSelecionadas([]);
  const selecionarTodas = () => setFrentesSelecionadas(frentes?.map((f) => f.id) || []);

  // Exemplo de como filtrar atividades com base nas frentes selecionadas:
  const atividadesFiltradas = useMemo(() => {
    if (!Array.isArray(atividades) || frentesSelecionadas.length === 0) return [];

    const selecionadasSet = new Set(frentesSelecionadas);

    return atividades.filter((a) => {
      const ids = Array.isArray(a.frenteDeTrabalhoIds)
        ? Array.from(new Set(a.frenteDeTrabalhoIds.map(Number))) // remove duplicados dentro da própria atividade
        : [];
      return ids.some((fid) => selecionadasSet.has(fid));
    });
  }, [atividades, frentesSelecionadas]);
  console.log('atividades das frentes selecionadas', atividadesFiltradas);

  //funcao para criar atividadesContrato com base em atv filtradas
  useEffect(() => {
    const atvContrato = atividadesFiltradas.map((atv, index) => { //novo array com os valores de atividadecontrato que se espera
      return {
        id: 0,
        contratoId: Number(contratoSelecionado?.id),
        atividadeId: atv?.id,
        usuarioDelegadoId: Number(contratoSelecionado?.supervisorUsuarioId),
        sequencia: index,
        statusAtividade: 0,
        descricaoCustomizada: `${atv?.nome}${atv?.instrucao?.trim() ? " | " + atv.instrucao : ""}`,
        dataLimite: new Date,
        nomeUsuarioDelegado: contratoSelecionado?.nomeSupervisor,
      };
    });

    setAtividadesListadas(atvContrato);
    console.log('novo array de atvcontrato', atvContrato);
  }, [frentesSelecionadas]);

  //atualizo a lista com o valor de atvcontrato

  console.log('atividades listadas', atividadesListadas)
  ///abrir modal para editar
  const handleEditAtv = (atv) => {
    setAtividadeSelecionada(atv);
    setOpenModal(true);
  }

  // funcao para pegar atv editada no modal e ataulizar no array
  const handleSalvarAtv = (atvEditada) => {
    setAtividadesListadas(prev =>
      prev.map(atv =>
        atv.atividadeId === atvEditada.atividadeId ? atvEditada : atv
      )
    );
  };
  //remover uma atividade com base no seu id
  const handleRemoverAtv = (atividadeId) => {
    setAtividadesListadas(prev =>
      prev.filter(item => item.atividadeId !== atividadeId)
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


  return (
    <Flex direction='column' gap={5}>
      <FormControl isInvalid={!contratoSelecionado} isDisabled={frentesSelecionadas.length > 0}>
        <FormLabel>
          <Text as="b" fontSize="xl">
            Selecionar contrato
          </Text>           
              <Button
                variant="text"
                color="#68D391"
                leftIcon={contratoSelecionado ? null : <FaPlus />}
                onClick={() => {contratoSelecionado ?  abrirEdicaoContrato() : abrirCriacaoContrato() }}
              >
                {contratoSelecionado ? 'Editar' : 'Adicionar'}
              </Button>
        </FormLabel>
        <Select
          placeholder="Selecione um contrato"
          name="contratoId"
          value={contratoSelecionado?.id}
          onChange={handleSelectContrato}

        >
          {contratos.map((c) => (
            <option key={c?.id} value={c?.id}>
              {c?.descricao}
            </option>
          ))}
        </Select>
        <FormErrorMessage color={'red'}>Contrato é obrigatório</FormErrorMessage>
      </FormControl>
      {contratoSelecionado && (
        <Grid templateColumns={{base: '1fr', sm: '1fr 1.4fr' }} gap={4} p={2}>
          <GridItem>
            <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between" align="center">
              <Text as="b" fontSize="xl">
                Selecione frente de trabalho
              </Text>
              <HStack>
                <Button size="sm" variant="outline" onClick={limparSelecao}>
                  Limpar
                </Button>
                <Button size="sm" onClick={selecionarTodas} isDisabled={!frentes?.length}>
                  Selecionar todas
                </Button>
              </HStack>
            </Flex>

            {/* Lista de frentes da empresa (multi-seleção por clique) */}
            <VStack align="stretch" spacing={3} paddingBlock={4}>
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
                    bg={isActive ? "#68d3912a" : "white"}
                    borderColor={isActive ? "#68D391" : "gray.200"}
                    _hover={{ shadow: "md" }}
                    role="button"
                    aria-pressed={isActive}
                  >
                    <HStack justify="space-between">
                      <Text fontWeight={700}>{ft?.nome}</Text>
                      {/* <Text fontSize="sm" color="gray.600">
                        {isActive ? "Selecionada" : "Clique para selecionar"}
                      </Text> */}
                    </HStack>
                  </Box>
                );
              })}
              {!frentes?.length && (
                <Text color="gray.500">Nenhuma frente cadastrada.</Text>
              )}
            </VStack>

            {/* Feedback rápido da seleção (opcional) */}
            {!!frentesSelecionadas.length && (
              <Text fontSize="sm" color="gray.600">
                {frentesSelecionadas.length} frente(s) selecionada(s){" "}
                {/* {frentesSelecionadas.join(", ")} */}
              </Text>
            )}
          </GridItem>
          {/* lista das atividades criadas das frentes seleciondadas */}

          <GridItem>
            {/* lista de atividades filtradas */}

            <List spacing={3}>
               <Text as="b" fontSize="xl">
                Atividades herdadas
              </Text>
              {atividadesListadas.map((atv, index) => (
                <ListItem
                  key={index}
                  w="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  border="1px solid"
                  borderColor="#d0d0d0"
                  px={3}
                  py={2}
                  borderRadius="md"
                >
                  <Flex align="center" gap={2}>
                    <Flex align="center" gap={1}>
                      <Flex direction='column' gap={1}>
                        <Tooltip placement="Defina sequência das atividades">
                          <IconButton variant='outline' size='xs' icon={<ChevronUpIcon />} onClick={() => move(index, "up")} />
                          <IconButton variant='outline' size='xs' icon={<ChevronDownIcon />} onClick={() => move(index, "down")} />
                        </Tooltip>
                      </Flex>
                      <Tooltip label={getStatusAtividade(atv?.statusAtividade)} placement="top">
                        <IconButton
                          isReadOnly
                          cursor="default"
                          size='sm'
                          variant='ghost'
                          aria-label="Status da atividade"
                          icon={
                            atv.statusAtividade === 0 ? <FaRegClock color="gray" /> :
                              atv.statusAtividade === 1 ? <FaHourglassHalf color="gray" /> :
                                atv.statusAtividade === 2 ? <FaRegCheckCircle color="green" /> :
                                  atv.statusAtividade === 3 ? <FaExclamationTriangle color="red" /> :
                                    <FaRegClock color="gray" />
                          }
                        />
                      </Tooltip>
                      <Box ml="3">
                        <Text fontWeight={600} color="gray.600" fontSize={14}>
                          {atv?.descricaoCustomizada}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex gap={2}>
                    <IconButton
                      aria-label="Editar"
                      icon={<EditIcon />}
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAtv(atv)}
                    />
                    <Tooltip label={atv?.nomeUsuarioDelegado} placement="top">
                      <IconButton
                        aria-label="Responsável"
                        icon={
                          <Avatar size="xs" name={atv?.nomeUsuarioDelegado}>
                            <AvatarBadge boxSize="1" bg="green.500" />
                          </Avatar>
                        }
                        variant="outline"
                        size="sm"
                      />
                    </Tooltip>
                    <Tooltip label={'Remover atividade'} placement="top">
                      <IconButton
                        aria-label="remover"
                        icon={<CloseIcon />}
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoverAtv(atv?.atividadeId)}
                      />
                    </Tooltip>
                  </Flex>
                </ListItem>
              ))}
            </List>
            {atividadesListadas.length > 0 && (
              <HStack justify="flex-end" paddingBlock={3}>
                <Button onClick={() => salvarAtividadesContratoEmLote(atividadesListadas)}>
                  Salvar alterações
                </Button>
              </HStack>
            )}
          </GridItem>
        </Grid>
      )}

      {/* modal de editar atividade de forma temporaria e retorna callback do valor editado */}
      <EditAtvModal
        open={openModal}
        setOpen={setOpenModal}
        atvSelecionada={atividadeSelecionada}
        onConfirm={handleSalvarAtv}
      />

      {/* modal de edição add contratos */}
      <ContratoEditModal
        isOpen={isContratoOpen}
        onClose={() => setIsContratoOpen(false)}
        contrato={contratoParaEdicao}              // null => cria | objeto => edita
        onSaved={() => listarContratos(null, true)}
      />

    </Flex>
  );
};
