"use client";
import { useEffect, useState, useMemo } from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  Tooltip,
  VStack,
  Divider,
  Tag,
  Icon, // Added Icon import
} from "@chakra-ui/react";
import { SearchInput } from "../../../components/InputSearch";
import { dateConverter, getCurrentMonth } from "../../../utils/utils"; // Removed filterDateMonth
import { EditIcon, InfoIcon, SmallCloseIcon, ViewIcon } from "@chakra-ui/icons";
import { ModalEditarAtv } from "../components/ModalEditarAtv";
import { Informativo } from "../../../components/Informativo";
import { FaExclamationTriangle, FaHourglassHalf, FaRegCheckCircle, FaRegClock, FaFlagCheckered, FaPlay } from "react-icons/fa";
import { getStatusAtividade } from "../../../utils/labelUtils";

export const AtvContrato = ({
  contratoSelecionado,
  atividadesContrato,
  loadingAtividades,
  setAtividadeSelecionada,
  atividadeSelecionada,
  modalEditarAberto,
  setModalEditarAberto,
  listarAtividadesContrato
}) => {
  const [filtro, setFiltro] = useState('');
  const [dateRef, setDateRef] = useState(getCurrentMonth());

  // Prepare grouped data
  const groupedData = useMemo(() => {
    if (!contratoSelecionado) return {};

    // 1. Create Markers
    const markers = [];
    if (contratoSelecionado.dataInicio) {
      markers.push({
        id: 'start-marker',
        type: 'marker',
        markerType: 'start',
        dataLimite: contratoSelecionado.dataInicio,
        label: 'Início do Contrato',
      });
    }
    if (contratoSelecionado.dataFim) {
      markers.push({
        id: 'end-marker',
        type: 'marker',
        markerType: 'end',
        dataLimite: contratoSelecionado.dataFim,
        label: 'Fim do Contrato',
      });
    }

    // 2. Merge with Activities
    const allItems = [
      ...markers,
      ...(atividadesContrato || []).map(a => ({ ...a, type: 'activity' }))
    ];

    // 3. Filter by Date (Month) AND Text Search
    const filtered = allItems.filter(item => {
      // Date Filter
      if (dateRef) {
        if (!item.dataLimite) return false;
        const d = new Date(item.dataLimite);
        if (isNaN(d.getTime())) return false;
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        if (ym !== dateRef) return false;
      }

      // Text Search (only for activities generally, but maybe markers too if label matches?)
      if (filtro) {
        const term = filtro.toLowerCase();
        if (item.type === 'marker') {
          return item.label.toLowerCase().includes(term);
        }
        return (
          item.descricaoCustomizada?.toLowerCase().includes(term) ||
          item.nomeUsuarioDelegado?.toLowerCase().includes(term)
        );
      }
      return true;
    });

    // 4. Sort by Date
    filtered.sort((a, b) => new Date(a.dataLimite) - new Date(b.dataLimite) || (a.sequencia || 0) - (b.sequencia || 0));

    // 5. Group by Date
    const groups = {};
    filtered.forEach(item => {
      const dateKey = new Date(item.dataLimite).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
    });

    return groups;
  }, [contratoSelecionado, atividadesContrato, dateRef, filtro]);

  const hasItems = Object.keys(groupedData).length > 0;

  return (
    <>
      <Flex direction="column" gap={6} p={4} w="100%">
        <Box w="100%">
          <Flex direction='row' gap={4} alignItems="center" flexWrap="wrap">
            <Box flex="1" minW="300px">
              <SearchInput
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Filtrar por atividade..."
              />
            </Box>
            <Flex gap={2} alignItems="center" flexWrap="wrap">
              <Input
                type='month'
                value={dateRef}
                onChange={(e) => setDateRef(e.target.value)}
              />
            </Flex>
            <Flex>
              <Button
                onClick={() => setDateRef('')}
                isDisabled={!dateRef}
                variant='outline'
                leftIcon={<ViewIcon />}
              >
                Ver Todo Período
              </Button>
            </Flex>
          </Flex>
        </Box>

        <Box w="100%">
          {loadingAtividades ? (
            <Informativo tipo="carregando" />
          ) : (atividadesContrato || []).length === 0 && !hasItems ? (
            <Informativo titulo="Não existem atividades atribuídas" />
          ) : !hasItems ? (
            <Informativo titulo="Nenhum item encontrado no período" mensagem='Tente ajustar o mês/ano selecionado ou o termo da pesquisa' />
          ) : (
            <VStack spacing={6} align="stretch">
              {Object.entries(groupedData).map(([dateLabel, items]) => (
                <Box key={dateLabel}>
                  <Flex align="center" mb={4} px={2} mt={2}>
                    <Text
                      fontSize="md"
                      fontWeight="bold"
                      color="blue.600"
                      whiteSpace="nowrap"
                      mr={3}
                    >
                      {dateLabel}
                    </Text>
                    <Divider borderColor="gray.300" />
                  </Flex>

                  <List spacing={2}>
                    {items.map((item) => (
                      <ListItem key={item.id} px={1}>
                        {item.type === 'marker' ? (
                          <Flex
                            bg={item.markerType === 'start' ? "blue.50" : "orange.50"}
                            p={3}
                            borderRadius="md"
                            align="center"
                            borderLeft="4px solid"
                            borderColor={item.markerType === 'start' ? "blue.400" : "orange.400"}
                          >
                            <Icon as={item.markerType === 'start' ? FaPlay : FaFlagCheckered} color={item.markerType === 'start' ? "blue.500" : "orange.500"} mr={3} />
                            <Box>
                              <Text fontWeight="bold" color="gray.700">{item.label}</Text>
                              <Text fontSize="sm" color="gray.500">{dateConverter(item.dataLimite)}</Text>
                            </Box>
                          </Flex>
                        ) : (
                          // Render Activity
                          <Flex
                            w="100%"
                            justify="space-between"
                            align="center"
                            bg="white"
                            border="1px solid"
                            borderColor="gray.200"
                            px={4}
                            py={3}
                            borderRadius="lg"
                            _hover={{ shadow: "sm", borderColor: "teal.300" }}
                            transition="all 0.2s"
                            direction={{ base: 'column', md: 'row' }}
                            gap={{ base: 3, md: 0 }}
                          >
                            <Flex align="center" gap={3} w="100%">
                              <Tooltip label={getStatusAtividade(item?.statusAtividade)} placement="top">
                                <IconButton
                                  cursor="default"
                                  size='sm'
                                  variant='ghost'
                                  aria-label="Status"
                                  icon={
                                    item.statusAtividade === 0 ? <FaRegClock color="gray" /> :
                                      item.statusAtividade === 1 ? <FaHourglassHalf color="orange" /> :
                                        item.statusAtividade === 2 ? <FaRegCheckCircle color="green" /> :
                                          item.statusAtividade === 3 ? <FaExclamationTriangle color="red" /> :
                                            <FaRegClock color="gray" />
                                  }
                                />
                              </Tooltip>
                              <Box flex="1">
                                <Text fontWeight="600" color="gray.700" fontSize="sm" noOfLines={2}>
                                  {item?.descricaoCustomizada}
                                </Text>
                              </Box>
                            </Flex>

                            <Flex gap={2} w={{ base: '100%', md: 'auto' }} justify={{ base: 'flex-end', md: 'flex-start' }}>
                              <IconButton
                                aria-label="Editar"
                                icon={<EditIcon />}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setAtividadeSelecionada(item);
                                  setModalEditarAberto(true);
                                }}
                              />
                              <Tooltip label={item?.nomeUsuarioDelegado} placement="top">
                                <IconButton
                                  aria-label="Responsável"
                                  icon={
                                    <Avatar size="xs" name={item?.nomeUsuarioDelegado} />
                                  }
                                  variant="outline"
                                  size="sm"
                                />
                              </Tooltip>
                              <Tooltip label={`Sequência: ${item?.sequencia}`} placement='left'>
                                <IconButton
                                  aria-label="Info"
                                  icon={<InfoIcon />}
                                  variant="outline"
                                  size="sm"
                                />
                              </Tooltip>
                            </Flex>
                          </Flex>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </Flex>
      <ModalEditarAtv
        open={modalEditarAberto}
        setOpen={setModalEditarAberto}
        atvSelecionada={atividadeSelecionada}
        onSuccess={() => listarAtividadesContrato && listarAtividadesContrato(contratoSelecionado?.id)}
      />
    </>
  );
};
