'use client';
import React from 'react';
import { useCallback, useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { SearchInput } from '../../../components/InputSearch';
import { Informativo } from '../../../components/Informativo';
import { useCliente } from '../../../hooks/useClientes';
import { useContrato } from '../../../hooks/useContratos';
import { RiContractFill } from 'react-icons/ri';
import { dateConverter } from '../../../utils/utils';

// Debounce simples sem libs
function useDebouncedValue(value, delay = 300) {
  const [v, setV] = useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

export const Contratos = ({ onSelectContrato }) => {
  const [filtro, setFiltro] = useState('');
  const debouncedFiltro = useDebouncedValue(filtro, 300);
  const [ selectedContratoId, setSelectContratoId ] = useState(null);

  const { clientes } = useCliente();
  const { contratos, contratoLoading } = useContrato();

  // Mapa de clientes por id
  const clientById = useMemo(() => {
    const map = new Map();
    for (const c of clientes || []) map.set(c.id, c);
    return map;
  }, [clientes]);

  const norm = (s) => (s || '').toString().toLowerCase();

  const contratosFiltrados = useMemo(() => {
    const lista = contratos || [];
    if (!debouncedFiltro) return lista;

    const q = norm(debouncedFiltro);
    return lista.filter((ctr) => {
      const cli = clientById.get(ctr.clienteId);
      const hitCliente =
        cli &&
        (norm(cli.razaoSocial).includes(q) || norm(cli.cnpj).includes(q));
      const hitContrato = norm(ctr.descricao).includes(q);
      return hitCliente || hitContrato;
    });
  }, [contratos, clientById, debouncedFiltro]);

  const handleClickContrato = useCallback((ctr) => {
    setSelectContratoId(ctr?.id);
    onSelectContrato?.(ctr);
  }, [onSelectContrato]);

  console.log('contratos filtrados', contratosFiltrados)

  return (
    <Grid templateColumns="1fr" gap={6} p={3}>
      <GridItem>
        <SearchInput
          placeholder="Filtrar por cliente (razão social, CNPJ) ou contrato"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </GridItem>

      <GridItem>
        {contratoLoading ? (
          <Text fontStyle="italic" color="gray.500">
            Carregando contratos...
          </Text>
        ) : (contratos?.length || 0) === 0 ? (
          <Informativo />
        ) : (contratosFiltrados?.length || 0) === 0 ? (
          <Box px={4}>
            <Informativo
              titulo="Nada encontrado"
              mensagem="Ajuste o filtro e tente novamente."
            />
          </Box>
        ) : (
          <Stack spacing={3} pr={1}>
            
            {contratosFiltrados.map((contrato) => {
              const cliente = clientById.get(contrato.clienteId);
              const isActive = selectedContratoId === contrato?.id;
              
              return (
                <Flex
                  key={contrato.id}
                  onClick={() => handleClickContrato(contrato)}
                  gap="4"
                  alignItems="center"
                  border="1px solid"
                  borderRadius={10}
                  bg={isActive ? "#68d39131" : "#fff"}
                  borderColor={isActive ? "#68D391" : "gray.200"}
                  px={5}
                  py={2}
                  cursor='pointer'
                >
                 
                  <Flex direction='column' gap={0}>
                    <Heading size="sm" noOfLines={1}>
                      {contrato?.descricao}
                    </Heading>
                    <Text fontSize={12} noOfLines={1}>
                      Supervisor: {contrato?.nomeSupervisor || '—'} | Período {dateConverter(contrato?.dataInicio)} à {dateConverter(contrato?.dataFim)}
                    </Text>
                    <Text fontSize={12}>Cliente: {cliente.razaoSocial} <br />{cliente.cnpj}</Text>
                  </Flex>                  
                </Flex>
              );
            })}
          </Stack>
        )}
      </GridItem>
    </Grid>
  );
};
