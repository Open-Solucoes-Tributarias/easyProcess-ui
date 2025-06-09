'use client';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Grid,
  GridItem,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';
import { SearchInput } from '../../../components/InputSearch';
import { Informativo } from '../../../components/Informativo';
import { RxReader } from 'react-icons/rx';

import { useCliente } from '../../../contexts/ClientesContext';
import { useContrato } from '../../../contexts/ContratosContext';

export const Clientes = ({ handleSelecionarCliente, handleContratoSelecionado }) => {
  const { clientes } = useCliente();

  const {
    contratos,
    listarContratos,
    contratoLoading
  } = useContrato();

  return (
    <Grid templateColumns="1fr" gap={6} p={3}>
      <GridItem>
        <SearchInput />
      </GridItem>

      <GridItem>
        {contratoLoading ? (
          <Text fontStyle="italic" color="gray.500">
            Carregando contratos...
          </Text>
        ) : clientes.length === 0 ? (
          <Informativo />
        ) : (
          <Accordion allowMultiple>
            {clientes.map((cliente, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton
                    onClick={() => {
                      handleSelecionarCliente(cliente);
                      listarContratos(cliente.id); // função do context
                    }}
                  >
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
                            <RxReader />
                            <Box ml='3'>
                              <Text fontWeight={500} color="gray.600" fontSize={14}>
                                {contrato?.descricao}
                              </Text>
                            </Box>
                          </Flex>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box px={4}>
                      <Informativo
                        titulo={"Ops..."}
                        mensagem={"Ainda não existem contratos atribuídos"}
                      />
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
