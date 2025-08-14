'use client';
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Text,
  List,
  ListItem,
  IconButton,
  Stack,
  Box,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RxReader } from 'react-icons/rx';
import { FaPlus } from 'react-icons/fa';

import { DialogModal } from '../../components/DialogModal';
import { Informativo } from '../../components/Informativo';
import { useCliente } from '../../hooks/useClientes';

export const GerenciarClientes = () => {
  const {
    clientes,
    clienteSelecionado,
    clienteIsEditOpen,
    clienteModoEdicao,
    clienteAbrirCadastro,
    clienteAbrirEdicao,
    salvarCliente,
    excluirCliente,
    handleChangeCliente,
    setClienteIsEditOpen,
  } = useCliente();

  const ListaClientes = () => (
    <List spacing={3} w="100%">
      {clientes.map((cliente, index) => (
        <ListItem
          key={index}
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
          <Flex align="center" gap={2} onClick={() => clienteAbrirEdicao(cliente)}>
            <Flex align="center">
              <RxReader />
              <Box ml="3">
                <Text fontWeight={500} color="gray.600" fontSize={14}>
                  {cliente?.razaoSocial}
                </Text>
                <Text fontSize={13}>{cliente?.cnpj}</Text>
              </Box>
            </Flex>
          </Flex>
          <IconButton
            aria-label="Editar"
            icon={<BsThreeDotsVertical />}
            variant="outline"
            size="sm"
            onClick={() => clienteAbrirEdicao(cliente)}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={10}>
        <GridItem>
          <Text as="b" fontSize="xl">
            Clientes
          </Text>
          <Button
            variant="text"
            color="#68D391"
            leftIcon={<FaPlus />}
            onClick={clienteAbrirCadastro}
          >
            Adicionar
          </Button>

          <Flex style={styles.content}>
            <ListaClientes />
          </Flex>
        </GridItem>

        <GridItem>
          <Informativo
            tipo="info"
            titulo="Gerenciamento de Clientes"
            mensagem="Clientes são empresas às quais devem ser atribuídos processos e fluxos de trabalho..."
          />
        </GridItem>
      </Grid>

      <DialogModal
        isOpen={clienteIsEditOpen}
        onClose={() => setClienteIsEditOpen(false)}
        title={clienteModoEdicao ? 'Editar Cliente' : 'Adicionar Cliente'}
        onSave={salvarCliente}
        onDelete={clienteModoEdicao ? () => excluirCliente(clienteSelecionado?.id) : null}
        showDelete={clienteModoEdicao}
      >
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Nome Fantasia</FormLabel>
            <Input
              name="nomeFantasia"
              value={clienteSelecionado?.nomeFantasia || ''}
              onChange={handleChangeCliente}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Razão Social</FormLabel>
            <Input
              name="razaoSocial"
              value={clienteSelecionado?.razaoSocial || ''}
              onChange={handleChangeCliente}
            />
          </FormControl>

          <FormControl>
            <FormLabel>CNPJ</FormLabel>
            <Input
              name="cnpj"
              value={clienteSelecionado?.cnpj || ''}
              onChange={handleChangeCliente}
            />
          </FormControl>

          {clienteModoEdicao && (
            <FormControl>
              <FormLabel>Data de Cadastro</FormLabel>
              <Input
                disabled
                type="datetime-local"
                name="dataCadastro"
                // value={contratoSelecionado?.dataInicio?.split('T')[0] || ''}
                value={clienteSelecionado?.dataCadastro || ''}
                onChange={handleChangeCliente}
              />
            </FormControl>
          )}
        </Stack>
      </DialogModal>
    </>
  );
};

const styles = {
  content: {
    width: '100%',
    minHeight: '50vh',
    height: '100%',
    overflowY: 'auto',
    border: '1px solid',
    borderColor: '#d0d0d0',
    borderRadius: 10,
    paddingInline: 30,
    paddingBlock: 30,
  },
};
