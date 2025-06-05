"use client";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SearchInput } from "../../../components/InputSearch";
import { getAtividadesContrato } from "../../../services/atividadesContrato";


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
      <Accordion>
        {/* ordenar o array pelo valor "sequencia" antes de mapear */}
        {atvContrato
          .slice() //copia segura antes de alterar o array
          .sort((a, b) => a.sequence - b.sequence)
          .map((atv, index) => (
            <AccordionItem key={atv.id}>
              <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box as='span' pl={4} textAlign='left'>
                  <Text fontWeight={600} color="gray.600" fontSize={14}>
                    {atv?.descricaoCustomizada}
                  </Text>
                  <Text fontSize={13}>{atv?.datalimite}</Text>
                  <Text>{atv?.sequencia}</Text>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {/* {contratos.length > 0 ? (
                        <List spacing={3} w="100%">
                          {contratos.map((contrato, index) => (
                            <ListItem
                              key={index}
                              onClick={() => handleContratoSelecionado(contrato)}
                              w="100%"
                              display="flex"
                              justifyContent="left"
                              alignItems="center"
                              paddingLeft={10}
                              fontStyle='italic'
                              fontWeight={400}
                              borderRadius="md"
                              _hover={{
                                background: 'gray.100',
                                cursor: 'pointer',
                              }}
                            >
    
                              <Flex align="center" gap={2}>
                                <Flex align="center">
                                  <RxReader />
                                  <Box ml='3'>
                                    <Text fontWeight={500} color="gray.600" fontSize={14}>
                                      {contrato?.descricao}
                                    </Text>
                                  </Box>
                                </Flex>
                              </Flex>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Box px={4}>
                          <Text fontStyle="italic" color="gray.500">
                            Não existem informações disponíveis.
                          </Text>
                          <Informativo titulo={"Ops..."} mensagem={"Ainda não existem contratos atribuidos "} />
                        </Box>
                      )} */}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <GridItem>


      </GridItem>
    </Grid>
  );
};
