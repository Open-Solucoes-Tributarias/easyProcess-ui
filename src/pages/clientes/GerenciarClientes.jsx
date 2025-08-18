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
import { FaPlus } from 'react-icons/fa';
import { DialogModal } from '../../components/DialogModal';
import { Informativo } from '../../components/Informativo';
import { useCliente } from '../../hooks/useClientes';
import { FaUserTie } from 'react-icons/fa6';

import {
  formatCliente,
  inferTipoDocumento,
  remaskDocumento,
} from '../../utils/formatCliente';
import { EditIcon } from '@chakra-ui/icons';

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

  // Tipo atual:
  // 1) usa o tipo salvo (se houver)
  // 2) senão, infere pelo conteúdo do campo 'cnpj' (11 dígitos = CPF, 14 = CNPJ)
  const tipoDocumentoAtual =
    clienteSelecionado?.tipoDocumento ??
    inferTipoDocumento(clienteSelecionado?.cnpj || "");

  // Valor do input vem SEMPRE de 'cnpj' (API única)
  const documentoValue = clienteSelecionado?.cnpj || "";

  // Mudar o tipo → re-mascar o valor atual e manter em 'cnpj'
  const onChangeTipoDocumento = (e) => {
    const novoTipo = e.target.value;
    const reformatado = remaskDocumento(documentoValue, novoTipo);

    // atualiza tipoDocumento (para UI) e cnpj (valor que vai pra API)
    handleChangeCliente({ target: { name: 'tipoDocumento', value: novoTipo } });
    handleChangeCliente({ target: { name: 'cnpj', value: reformatado } });
  };

  // Digitação no documento → formata conforme tipo atual e salva em 'cnpj'
  const onChangeDocumento = (e) => {
    const raw = e.target.value;
    const formatted = formatCliente(raw, {
      isCnpj: tipoDocumentoAtual === 'CNPJ',
      isCpf: tipoDocumentoAtual === 'CPF',
    });
    handleChangeCliente({ target: { name: 'cnpj', value: formatted } });
  };

  // Lista mostra o campo 'cnpj' (pode conter CPF/CNPJ/outra string)
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
              <FaUserTie />
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
            icon={<EditIcon />}
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
          <Text as="b" fontSize="xl">Clientes</Text>
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
        onSave={salvarCliente}  // já estará em clienteSelecionado.cnpj, formatado
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

            {/* Tipo de Documento (apenas para máscara/UI) */}
          <Flex direction='row' gap={1}>
            <FormControl width='30%'>
              <FormLabel>Tipo</FormLabel>
              <Select
                name="tipoDocumento"
                value={tipoDocumentoAtual}
                onChange={onChangeTipoDocumento}
              >
                <option value="CNPJ">CNPJ</option>
                <option value="CPF">CPF</option>
                <option value="OUTRO">Outro</option>
              </Select>
            </FormControl>

            {/* Documento (sempre salva em 'cnpj') */}
            <FormControl>
              <FormLabel>Documento</FormLabel>
              <Input
                name="cnpj"  // <-- mantém compat c/ backend
                value={documentoValue}
                onChange={onChangeDocumento}
                placeholder={
                  tipoDocumentoAtual === 'CNPJ'
                    ? '00.000.000/0000-00'
                    : tipoDocumentoAtual === 'CPF'
                      ? '000.000.000-00'
                      : 'Digite o documento'
                }
                inputMode={tipoDocumentoAtual === 'OUTRO' ? 'text' : 'numeric'}
              />
            </FormControl>
          </Flex>

          {clienteModoEdicao && (
            <FormControl>
              <FormLabel>Data de Cadastro</FormLabel>
              <Input
                disabled
                type="datetime-local"
                name="dataCadastro"
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
