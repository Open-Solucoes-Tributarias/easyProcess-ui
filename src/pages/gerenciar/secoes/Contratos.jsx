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
  Select,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RxReader } from 'react-icons/rx';
import { FaPlus } from 'react-icons/fa';

import { DialogModal } from '../../../components/DialogModal';
import { Informativo } from '../../../components/Informativo';
import { useContrato } from '../../../contexts/ContratosContext';
import { useCliente } from '../../../contexts/ClientesContext';
import { useUsuarios } from '../../../contexts/UsuariosContext';

export const Contratos = () => {
  const {
    contratos,
    contratoSelecionado,
    contratoIsEditOpen,
    contratoModoEdicao,
    contratoAbrirCadastro,
    contratoAbrirEdicao,
    salvarContrato,
    excluirContrato,
    handleChangeContrato,
    setContratoIsEditOpen,
  } = useContrato();

  const { clientes } = useCliente();
  const { usuarios } = useUsuarios();
  console.log('cliente selecionado no contrato', contratoSelecionado)

  const ListaContratos = () => (
    <List spacing={3} w="100%">
      {contratos.map((contrato, index) => (
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
          <Flex align="center" gap={2} onClick={() => contratoAbrirEdicao(contrato)}>
            <Flex align="center">
              <RxReader />
              <Box ml="3">
               
                <Text fontWeight={500} color="gray.600" fontSize={13}>
                  Descrição: {contrato?.descricao}
                </Text>
                 <Text fontSize={13}>Supervisor: {contrato?.nomeSupervisor}</Text>
              </Box>
            </Flex>
          </Flex>
          <IconButton
            aria-label="Editar"
            icon={<BsThreeDotsVertical />}
            variant="outline"
            size="sm"
            onClick={() => contratoAbrirEdicao(contrato)}
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
            Contratos
          </Text>
          <Button
            variant="text"
            color="#68D391"
            leftIcon={<FaPlus />}
            onClick={contratoAbrirCadastro}
          >
            Adicionar
          </Button>

          <Flex style={styles.content}>
            <ListaContratos />
          </Flex>
        </GridItem>

        <GridItem>
          <Informativo
            tipo="info"
            titulo="Gerenciamento de Contratos"
            mensagem="Contratos representam vínculos entre clientes e serviços da empresa, com supervisores e datas de vigência definidas."
          />
        </GridItem>
      </Grid>

      <DialogModal
        isOpen={contratoIsEditOpen}
        onClose={() => setContratoIsEditOpen(false)}
        title={contratoModoEdicao ? 'Editar Contrato' : 'Novo Contrato'}
        onSave={() => salvarContrato(true)} // ← true para forçar listagem geral
        onDelete={
          contratoModoEdicao && contratoSelecionado?.id
            ? () => excluirContrato(contratoSelecionado.id, contratoSelecionado.clienteId, true) // ← true para listagem geral
            : null
        }
        showDelete={contratoModoEdicao}
      >
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Cliente</FormLabel>
            <Select
              name="clienteId"
              value={contratoSelecionado?.clienteId}
              onChange={handleChangeContrato}
            >
              {clientes.map((cliente) => (
                <option key={cliente?.id} value={cliente?.id}>{cliente?.razaoSocial}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Supervisor</FormLabel>           
            <Select
              name="supervisorUsuarioId"
              value={contratoSelecionado?.supervisorUsuarioId}
              onChange={handleChangeContrato}
            >
              {usuarios.map((usuario) => (
                <option key={usuario?.id} value={usuario?.id}>{usuario?.nome}</option>
              ))}
            </Select>
          </FormControl>
          {contratoModoEdicao && (
            <FormControl>
              <FormLabel>Nome do Supervisor</FormLabel>
              <Input
                disabled
                name="nomeSupervisor"
                value={contratoSelecionado?.nomeSupervisor || ''}
                onChange={handleChangeContrato}
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Descrição</FormLabel>
            <Input
              name="descricao"
              value={contratoSelecionado?.descricao || ''}
              onChange={handleChangeContrato}
            />
          </FormControl>
                  <Flex direction='row' gap={2}>
                      <FormControl width='50%'>
                          <FormLabel>Inicio do contrato</FormLabel>
                          <Input
                              type="date"
                              name="dataInicio"
                              value={contratoSelecionado?.dataInicio?.split('T')[0] || ''}
                              onChange={handleChangeContrato}
                          />
                      </FormControl>

                      <FormControl width='50%'>
                          <FormLabel>Término do contrato</FormLabel>
                          <Input
                              type="date"
                              name="dataFim"
                              value={contratoSelecionado?.dataFim?.split('T')[0] || ''}
                              onChange={handleChangeContrato}
                          />
                      </FormControl>

                  </Flex>          
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
