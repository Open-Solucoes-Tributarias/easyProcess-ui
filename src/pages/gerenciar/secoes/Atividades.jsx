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

import { DialogModal } from '../../../components/DialogModal';
import { Informativo } from '../../../components/Informativo';
import { useAtividades } from '../../../contexts/AtividadesContext';

export const Atividades = () => {
  const {
    atividades,
    atividadeAtual,
    atividadeIsEditOpen,
    atividadeModoEdicao,
    atividadeAbrirCadastro,
    abrirEdicaoAtividade,
    abrirCadastroAtividade,
    salvarAtividade,
    deletarAtividade,
    handleChangeAtividade,
    setAtividadeIsEditOpen,
  } = useAtividades();

  const ListaAtividades = () => (
    <List spacing={3} w="100%">
      {atividades.map((atividade, index) => (
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
          <Flex align="center" gap={2} onClick={() => abrirEdicaoAtividade(atividade)}>
            <Flex align="center">
              <RxReader />
              <Box ml="3">
                <Text fontWeight={500} color="gray.600" fontSize={14}>
                  {atividade?.nome}
                </Text>
                <Text fontSize={13}>Tipo: {atividade?.tipo}</Text>
              </Box>
            </Flex>
          </Flex>
          <IconButton
            aria-label="Editar"
            icon={<BsThreeDotsVertical />}
            variant="outline"
            size="sm"
            onClick={() => abrirEdicaoAtividade(atividade)}
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
            Atividades
          </Text>
          <Button
            variant="text"
            color="#68D391"
            leftIcon={<FaPlus />}
            onClick={abrirCadastroAtividade}
          >
            Adicionar
          </Button>

          <Flex style={styles.content}>
            <ListaAtividades />
          </Flex>
        </GridItem>

        <GridItem>
          <Informativo
            tipo="info"
            titulo="Gerenciamento de Atividades"
            mensagem="Atividades representam ações recorrentes ou pontuais vinculadas a frentes de trabalho. Você pode definir tipo, instrução e recorrência."
          />
        </GridItem>
      </Grid>

      <DialogModal
        isOpen={atividadeIsEditOpen}
        onClose={() => setAtividadeIsEditOpen(false)}
        title={atividadeModoEdicao ? 'Editar Atividade' : 'Adicionar Atividade'}
        onSave={salvarAtividade}
        onDelete={atividadeModoEdicao ? () => deletarAtividade(atividadeAtual?.id) : null}
        showDelete={atividadeModoEdicao}
      >
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              name="nome"
              value={atividadeAtual?.nome || ''}
              onChange={handleChangeAtividade}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tipo</FormLabel>
            <Input
              name="tipo"
              type="number"
              value={atividadeAtual?.tipo || ''}
              onChange={handleChangeAtividade}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Recorrência</FormLabel>
            <Input
              name="recorrencia"
              type="number"
              value={atividadeAtual?.recorrencia || ''}
              onChange={handleChangeAtividade}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Instrução</FormLabel>
            <Input
              name="instrucao"
              value={atividadeAtual?.instrucao || ''}
              onChange={handleChangeAtividade}
            />
          </FormControl>
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
