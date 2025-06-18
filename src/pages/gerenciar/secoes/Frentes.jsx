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
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RxBackpack } from 'react-icons/rx';
import { FaPlus } from 'react-icons/fa';

import { DialogModal } from '../../../components/DialogModal';
import { Informativo } from '../../../components/Informativo';
import { useFrentes } from '../../../contexts/FrentesContext';
import { useAtividades } from '../../../contexts/AtividadesContext';
import { useFrenteDeTrabalhoAtv } from '../../../contexts/FrentesAtividades';

export const FrentesTrabalho = () => {
  const {
    frentes,
    frenteAtual,
    frenteIsEditOpen,
    frenteModoEdicao,
    frenteAbrirCadastro,
    frenteAbrirEdicao,
    salvarFrente,
    deletarFrente,
    handleChangeFrente,
    setFrenteIsEditOpen,
  } = useFrentes();

  const { atividades } = useAtividades();

  const { atribuirMultiplasAtividades } = useFrenteDeTrabalhoAtv();

  const ListaFrentes = () => (
    <List spacing={3} w="100%">
      {frentes.map((frente, index) => (
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
          <Flex align="center" gap={2} onClick={() => frenteAbrirEdicao(frente)}>
            <Flex align="center">
              <RxBackpack />
              <Box ml="3">
                <Text fontWeight={500} color="gray.600" fontSize={14}>
                  {frente?.nome}
                </Text>
              </Box>
            </Flex>
          </Flex>
          <IconButton
            aria-label="Editar"
            icon={<BsThreeDotsVertical />}
            variant="outline"
            size="sm"
            onClick={() => frenteAbrirEdicao(frente)}
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
            Frentes de Trabalho
          </Text>
          <Button
            variant="text"
            color="#68D391"
            leftIcon={<FaPlus />}
            onClick={frenteAbrirCadastro}
          >
            Adicionar
          </Button>

          <Flex style={styles.content}>
            <ListaFrentes />
          </Flex>
          <CheckboxGroup
            colorScheme="green"
            value={frenteAtual.atividadeIds?.map(String) || []}
            onChange={(valoresSelecionados) =>
              handleChangeFrente({
                target: {
                  name: 'atividadeIds',
                  value: valoresSelecionados,
                },
              })
            }
          >
          </CheckboxGroup>
        </GridItem>

        <GridItem>
          <Informativo
            tipo="info"
            titulo="Frentes de Trabalho"
            mensagem="Frentes de trabalho representam as áreas, categorias, ou qualquer outra divisão organizacional e podem ser atribuídas a contratos e clientes como um grupo de atividades pré-definidas..."
          />
        </GridItem>
      </Grid>

      <DialogModal
        isOpen={frenteIsEditOpen}
        onClose={() => setFrenteIsEditOpen(false)}
        title={frenteModoEdicao ? 'Editar Frente' : 'Adicionar Frente'}
        onSave={async () => {
          await salvarFrente();
          if (frenteAtual?.atividadeIds?.length) {
            await atribuirMultiplasAtividades(frenteAtual.id, frenteAtual.atividadeIds);
          }
        }}
        onDelete={frenteModoEdicao ? () => deletarFrente(frenteAtual?.id) : null}
        showDelete={frenteModoEdicao}
      >
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Nome da Frente de Trabalho</FormLabel>
            <Input
              name="nome"
              value={frenteAtual?.nome || ''}
              onChange={handleChangeFrente}
            />
          </FormControl>

          <CheckboxGroup
            colorScheme="green"
            value={frenteAtual.atividadeIds?.map(String) || []}
            onChange={(valoresSelecionados) =>
              handleChangeFrente({
                target: {
                  name: 'atividadeIds',
                  value: valoresSelecionados,
                },
              })
            }
          >
            <Text>Atribuir atividades à frente</Text>
            <Stack spacing={[1, 3]} direction={['column', 'row']} wrap="wrap">
              {atividades.map((atividade) => (
                <Checkbox key={atividade.id} value={String(atividade.id)}>
                  {atividade.nome}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
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
