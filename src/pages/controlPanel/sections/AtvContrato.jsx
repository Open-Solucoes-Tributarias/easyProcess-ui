"use client";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { SearchInput } from "../../../components/InputSearch";
import { dateConverter } from "../../../utils/utils";
import { EditIcon, InfoIcon } from "@chakra-ui/icons";
import { ModalEditarAtv } from "../components/ModalEditarAtv";
import { useAtividadesContrato } from "../../../hooks/useAtividadesContrato";
import { Informativo } from "../../../components/Informativo";
import { FaExclamationTriangle, FaHourglassHalf, FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { getStatusAtividade } from "../../../utils/labelUtils";

export const AtvContrato = ({ contratoSelecionado }) => {
  const {
    atividadesContrato,
    listarAtividadesContrato,
    setAtividadeSelecionada,
    atividadeSelecionada,
    modalEditarAberto,
    setModalEditarAberto,
    loadingAtividades,
  } = useAtividadesContrato();

  //mes atual para valor incial do estado de data
  const getCurrentMonth = () => {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
  };

  const [filtro, setFiltro] = useState('');
  // state do filtro de data, sendo mes e ano
  const [dateRef, setDateRef] = useState(getCurrentMonth());

  useEffect(() => {
    if (contratoSelecionado?.id) {
      listarAtividadesContrato(contratoSelecionado.id);
    }
  }, [contratoSelecionado]);

    //funcao de filtro por data
  const filterDateMonth = (atividades, dateRef) => {
    if (!dateRef) return atividades; // se não há filtro, retorna tudo

    return atividades.filter((atv) => {
      if (!atv.dataLimite) return false;

      const d = new Date(atv.dataLimite);
      if (isNaN(d)) return false;

      // monta "YYYY-MM" com ano e mês da dataLimite das atividades
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

      return ym === dateRef;
    });
  };

  const atividadesFiltradas = filterDateMonth(atividadesContrato, dateRef)
    .filter(atv =>
      atv.descricaoCustomizada?.toLowerCase().includes(filtro.toLowerCase()) ||
      atv.nomeUsuarioDelegado?.toLowerCase().includes(filtro.toLowerCase())
    )
    .sort((a, b) => a.sequencia - b.sequencia); // ordenação por nº sequencia

  return (
    <>
      <Grid templateColumns="1fr" gap={6} p={4}>
        <GridItem>
          <Flex direction='row' gap={1}>
            <SearchInput
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Filtrar por atividade ou nome do responsável"
            />           
             <Input width='30%' type='month' value={dateRef} onChange={(e) => setDateRef(e.target.value)} />          
            {/* YYYY/-MM */}
          </Flex>
        </GridItem>
        <List spacing={3} w="100%">
          {loadingAtividades ? (
            <Informativo tipo="carregando" />
          ) : atividadesContrato.length === 0 ? (
            <Informativo titulo='Não existem atividades atribuidas' />
          ) : (
            atividadesFiltradas.map((atv) => (
              <ListItem
                key={atv.id}
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
                  <Flex align="center">
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
                      <Text fontSize={12}>
                        Prazo: {dateConverter(atv?.dataLimite)}
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
                    onClick={() => {
                      setAtividadeSelecionada(atv);
                      setModalEditarAberto(true);
                    }}
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
                  <Tooltip label={`Sequência da atividade: ${atv?.sequencia}`} placement='left-start'>
                    <IconButton
                      aria-label="Info"
                      icon={<InfoIcon size="xl" />}
                      variant="outline"
                      size="sm"
                    />
                  </Tooltip>
                </Flex>
              </ListItem>
            ))
          )}
        </List>
      </Grid>
      <ModalEditarAtv
        open={modalEditarAberto}
        setOpen={setModalEditarAberto}
        atvSelecionada={atividadeSelecionada}
      />
    </>
  );
};
