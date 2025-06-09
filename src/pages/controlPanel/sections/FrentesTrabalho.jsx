"use client";
import { useEffect } from "react";
import {
  Avatar,
  Box,
  Checkbox,
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

export const FrentesTrabalho = ({ contratoSelecionado }) => {
  const {
    atividadesContrato,
    listarAtividadesContrato,
    setAtividadeSelecionada,
    atividadeSelecionada,
    modalEditarAberto,
    setModalEditarAberto,
  } = useAtividadesContrato();

  useEffect(() => {
    if (contratoSelecionado?.id) {
      listarAtividadesContrato(contratoSelecionado.id);
    }
  }, [contratoSelecionado]);

  return (
    <>
      <Grid templateColumns="1fr" gap={6} p={4}>
        <GridItem>
          <SearchInput />
        </GridItem>
        <List spacing={3} w="100%">
          {atividadesContrato
            .slice()
            .sort((a, b) => a.sequence - b.sequence)
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
                    <Checkbox colorScheme="green" isChecked />
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
                  <IconButton
                    aria-label="Responsável"
                    icon={<Avatar size="xs" />}
                    variant="outline"
                    size="sm"
                  />
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
            ))}
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
