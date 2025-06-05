"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { SearchInput } from "../../../components/InputSearch";
import { getAtividadesContrato } from "../../../services/atividadesContrato";
import { dateConverter } from "../../../utils/utils";
import { BsThreeDotsVertical } from "react-icons/bs";


export const FrentesTrabalho = ({ contratoSelecionado }) => {
  const [atvContrato, setAtvContrato] = useState([]);

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

                  <Box ml='3'>
                    <Text fontWeight={600} color="gray.600" fontSize={14}>
                      {atv?.descricaoCustomizada}
                    </Text>
                    <Text fontSize={12}>Data limite: {dateConverter(atv?.dataLimite)}</Text>
                  </Box>
                </Flex>
              </Flex>
              <IconButton
                aria-label="Editar"
                icon={<BsThreeDotsVertical />}
                variant="outline"
                size="sm"
              />
            </ListItem>
          ))}
      </List>
      <GridItem>


      </GridItem>
    </Grid>
  );
};
