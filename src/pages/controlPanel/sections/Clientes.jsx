'use client';

import { useEffect, useState } from 'react';
import { Grid, GridItem, List, ListItem, Text } from '@chakra-ui/react';
import { SearchInput } from '../../../components/InputSearch';
import { getClientes } from '../../../services/companyService';
import { Informativo } from '../../../components/Informativo';

export const Clients = ({ onClienteSelecionada }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
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
          <Informativo/>
        ) : (
          <List styleType="disc" spacing={3}>
            {clientes.map((cliente) => (
              <ListItem
                sx={styles.listItem}
                key={cliente.id}
                onClick={() => handleCliente(cliente)}
              >
                {cliente.nome}
              </ListItem>
            ))}
          </List>
        )}
      </GridItem>
    </Grid>
  );
};

const styles = {
  listItem: {
    _hover: {
      color: '#68D391',
      cursor: 'pointer',
    },
  },
};
