"use client";
import { useEffect } from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  List,
  ListItem,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { SearchInput } from "../../../components/InputSearch";
import { dateConverter } from "../../../utils/utils";
import { EditIcon, InfoIcon } from "@chakra-ui/icons";
import { ModalEditarAtv } from "../components/ModalEditarAtv";
import { useAtividadesContrato } from "../../../contexts/AtividadesContratoContext";
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

  useEffect(() => {
    if (contratoSelecionado?.id) {
      listarAtividadesContrato(contratoSelecionado.id);
    }
  }, [contratoSelecionado]);

  console.log('atividades lista de sequencia', atividadesContrato)

  return (
    <>
      <Grid templateColumns="1fr" gap={6} p={4}>
        <GridItem>
          <SearchInput />
        </GridItem>
        <List spacing={3} w="100%">
          {loadingAtividades ? (
            <Informativo tipo="carregando" />
          ) : atividadesContrato.length === 0 ? (
            <Informativo titulo='Não existem atividades atribuidas' />
          ) : (
            atividadesContrato
              .slice()
              .sort((a, b) => a.sequencia - b.sequencia) //ordena por n. da var sequencia
              .map((atv) => (
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
                              atv.statusAtividade === 1 ? <FaHourglassHalf color="blue" /> :
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
                          Data limite: {dateConverter(atv?.dataLimite)}
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
                    <Tooltip label="Descrição da tarefa" placement="top">
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
