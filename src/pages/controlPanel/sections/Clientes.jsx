'use client';

import { useEffect, useState } from 'react';
import { Avatar, Box, Flex, Grid, GridItem, IconButton, List, ListItem, Text } from '@chakra-ui/react';
import { SearchInput } from '../../../components/InputSearch';
import { Informativo } from '../../../components/Informativo';
import { getCliente } from '../../../services/ClienteService';
import { color } from 'framer-motion';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RxAvatar } from 'react-icons/rx';

export const Clientes = ({ onClienteSelecionada }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  //funcao buscar dados dos clientes
  const ListarClientes = async () => {
    try {
      const dadosClientes = await getCliente();
      setClientes(dadosClientes);

    } catch (error) {
      console.error("não foi possivel buscar clientes")
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    ListarClientes();
  }, []);

  const handleCliente = (cliente) => {
    onClienteSelecionada(cliente);
  };

  return (
    <Grid templateColumns="1fr" gap={6} p={3}>
      <GridItem>
        <SearchInput />
      </GridItem>

      <GridItem pb={4} paddingInline={5}>
        {loading ? (
          <Text fontStyle="italic" color="gray.500">
            Carregando clientes...
          </Text>
        ) : clientes.length === 0 ? (
          <Informativo />
        ) : (
          <List spacing={3} w="100%">
            {clientes.map((cliente, index) => (
              <ListItem
                key={index}
                onClick={() => handleCliente(cliente)}
                w="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                border="1px solid"
                borderColor="#d0d0d0"
                px={3}
                py={2}
                borderRadius="md"
                _hover={{
                  background: 'gray.100',                 
                  cursor: 'pointer',
                }}
              >
                <Flex align="center" gap={2}>
                  <Flex align="center">
                    {/* <Avatar src={RxAvatar} size='sm' /> */}
                    <Box ml='3'>
                      <Text fontWeight={500} color="gray.600" fontSize={14}>
                        {cliente?.razaoSocial}
                      </Text>
                      <Text fontSize={13}>{cliente?.cnpj}</Text>
                    </Box>
                  </Flex>
                </Flex>               
              </ListItem>
            ))}
          </List>
        )}
      </GridItem>
    </Grid>
  );
};
