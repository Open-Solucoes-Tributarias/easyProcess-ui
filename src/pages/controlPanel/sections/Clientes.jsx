'use client';
import { useEffect, useState } from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Grid, GridItem, IconButton, List, ListItem, Text } from '@chakra-ui/react';
import { SearchInput } from '../../../components/InputSearch';
import { Informativo } from '../../../components/Informativo';
import { buscarClientes } from '../../../services/ClienteService';
import { RxReader } from 'react-icons/rx';
import { getContrato } from '../../../services/contratosService';

export const Clientes = ({ handleSelecionarCliente, handleContratoSelecionado }) => {
  const [clientes, setClientes] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);

  //funcao buscar dados dos clientes
  const listarClientes = async () => {
    try {
      const dadosClientes = await buscarClientes();
      setClientes(dadosClientes);

    } catch (error) {
      console.error("não foi possivel buscar clientes")
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    listarClientes();
  }, []);

  //funcao listar contratos de cada cliente
  const listarContratos = async (clienteId) => {
    try {
      const dadosContratos = await getContrato(clienteId);
      console.log("contratos existem para", clienteId, dadosContratos);
      setContratos(dadosContratos);
    } catch (error) {
      console.error("erro ao buscar contratos");
    } finally {

    }
  };

  return (
    <Grid templateColumns="1fr" gap={6} p={3}>
      <GridItem>
        <SearchInput />
      </GridItem>

      <GridItem>
        {loading ? (
          <Text fontStyle="italic" color="gray.500">
            Carregando contratos...
          </Text>
        ) : clientes.length === 0 ? (
          <Informativo />
        ) : (
          <Accordion>
            {clientes.map((cliente, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton onClick={() => { handleSelecionarCliente(cliente), listarContratos(cliente?.id); }}>
                    <AccordionIcon />
                    <Box as='span' pl={4} textAlign='left'>
                      <Text fontWeight={600} color="gray.600" fontSize={14}>
                        {cliente?.razaoSocial}
                      </Text>
                      <Text fontSize={13}>{cliente?.cnpj}</Text>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {contratos.length > 0 ? (
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
                      {/* <Text fontStyle="italic" color="gray.500">
                        Não existem informações disponíveis.
                      </Text> */}
                      <Informativo titulo={"Ops..."} mensagem={"Ainda não existem contratos atribuidos "} />
                    </Box>
                  )}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </GridItem>
    </Grid>
  );
};
