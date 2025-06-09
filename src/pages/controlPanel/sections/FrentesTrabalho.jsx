"use client";
import { useState, useEffect } from "react";
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
import { getAtividadesContrato } from "../../../services/atividadesContrato";
import { dateConverter } from "../../../utils/utils";
import { EditIcon, InfoIcon } from "@chakra-ui/icons";
import { ModalEditarAtv } from "../components/ModalEditarAtv";


export const FrentesTrabalho = ({ contratoSelecionado }) => {
  const [atvContrato, setAtvContrato] = useState([]);
  const [atvSelecionada, setAtvSelecionada] = useState({}); //atividade selecionado na lista

  //states do modal editar atv
  const [open, setOpen] = useState(false);

  //buscar atividades do contrato selecionado
  const listarAtvContrato = async (id) => {
    try {
      const dadosAtvContrato = await getAtividadesContrato(id);
      console.log("atividades do contrato selecionado");
      setAtvContrato(dadosAtvContrato);

    } catch (error) {
      console.error("não foi possivel buscar atividades do contrato")
    }
  };

  //só renderiza quando contrato for selecionado
  useEffect(() => {
    if (contratoSelecionado?.id) {
      listarAtvContrato(contratoSelecionado?.id);
    }
  }, [contratoSelecionado]);

  console.log('contrato no filho frentes', contratoSelecionado);
  console.log("atividades do contrato selecionado", atvContrato);


  return (
    <>
    <Grid templateColumns="1fr" gap={6} p={4}>
      <GridItem>
        <SearchInput />
      </GridItem>
      <List spacing={3} w="100%">
        {atvContrato
          .slice() //copia segura antes de alterar o array
          .sort((a, b) => a.sequence - b.sequence)
          .map((atv, index) => (
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
              <Flex align="center" gap={2} onClick={() => selecionarUsuario(cliente)}>
                <Flex align="center">
                  <Checkbox colorScheme="green" isChecked />
                  <Box ml='3'>
                    <Text fontWeight={600} color="gray.600" fontSize={14}>
                      {atv?.descricaoCustomizada}
                    </Text>
                    <Text fontSize={12}>Data limite: {dateConverter(atv?.dataLimite)}</Text>
                  </Box>
                </Flex>
              </Flex>
              <Flex gap={2}>
                <IconButton
                  aria-label="Editar"
                  icon={<EditIcon />}
                  variant="outline"
                  size="sm"
                  onClick={() => { setAtvSelecionada(atv), setOpen(true) }}
                />
                <IconButton
                  aria-label="Editar"
                  icon={<Avatar size='xs' />}
                  variant="outline"
                  size="sm"
                />
                <Tooltip label='Descrição da tarefa' placement='top'>
                  <IconButton
                    aria-label="Editar"
                    icon={<InfoIcon size='xl' />}
                    variant="outline"
                    size="sm"
                  />
                </Tooltip>
              </Flex>
            </ListItem>
          ))}
      </List>
    </Grid>
    <ModalEditarAtv open={open} setOpen={setOpen} atvSelecionada={atvSelecionada} />
    </>
  );
};
