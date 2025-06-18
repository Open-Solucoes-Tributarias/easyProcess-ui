'use client';
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
  Heading,
  Text
} from '@chakra-ui/react';
import { SearchInput } from '../../../components/InputSearch';
import { Informativo } from '../../../components/Informativo';
import { useCliente } from '../../../contexts/ClientesContext';
import { useContrato } from '../../../contexts/ContratosContext';
import { RiContractFill } from 'react-icons/ri';
import { dateConverter } from '../../../utils/utils';

export const Contratos = ({ handleSelecionarCliente, handleContratoSelecionado }) => {
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
          <Accordion allowToggle>
            {clientes.map((cliente, index) => (
              <AccordionItem key={index} border='none' paddingBlock={1}>
                <h2>
                  <AccordionButton
                    onClick={() => {
                      handleSelecionarCliente(cliente);
                      listarContratos(cliente.id); // função do context
                    }}
                    border='1px solid' borderColor='#d0d0d0' borderRadius={10}
                  >
                    <AccordionIcon />
                    <Box as='span' pl={4} textAlign='left'>
                      <Heading size='sm'>
                        {cliente?.razaoSocial}
                      </Heading>
                      <Text fontSize={13}>{cliente?.cnpj}</Text>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel paddingRight={0} paddingLeft={5}>
                  {contratos.length > 0 ? (
                    <>
                      {contratos.map((contrato, index) => (
                        <Flex key={index} onClick={() => handleContratoSelecionado(contrato)} flex='1' gap='4' alignItems='center' border='1px solid' borderColor='#d0d0d0' borderRadius={10}
                          paddingInline={5} paddingBlock={2} marginBlock={2} _hover={{
                            background: 'gray.100',
                            cursor: 'pointer',
                          }}>
                            <Avatar size='xs' bg={'#48bb78'} icon={<RiContractFill size={15}/>} />
                          <Box>
                            <Heading size='sm'>{contrato?.descricao}</Heading>
                            <Text fontSize={12}>Supervisor: {contrato?.nomeSupervisor}</Text>
                            <Text fontSize={12}>Inicio {dateConverter(contrato?.dataInicio)} / Fim {dateConverter(contrato?.dataFim)}</Text>
                          </Box>
                        </Flex>
                      ))}
                    </>
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
