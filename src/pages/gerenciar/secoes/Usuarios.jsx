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
  Select,
  IconButton,
  Stack,
  Box,
  Badge,
  Avatar,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RxAvatar } from 'react-icons/rx';
import { FaPlus } from 'react-icons/fa';

import { DialogModal } from '../../../components/DialogModal';
import { getPerfilLabel } from '../../../utils/labelUtils';
import { Informativo } from '../../../components/Informativo';
import { useUsuarios } from '../../../hooks/useUsuarios';

export const Usuarios = () => {
  const {
    usuarios,
    usuarioSelecionado,
    usuarioIsEditOpen,
    usuarioModoEdicao,
    usuarioAbrirCadastro,
    usuarioAbrirEdicao,
    salvarUsuario,
    excluirUsuario,
    handleChangeUsuario,
    setUsuarioIsEditOpen,
    setUsuarioSelecionado,
  } = useUsuarios();

  const usuarioAtual = (userName) => {
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    try {
      const user = JSON.parse(userData);
      return userName === user.usuario;
    } catch {
      return false;
    }
  };

  const ListaUsuarios = () => (
    <List spacing={3} w="100%">
      {usuarios.map((usuario, index) => (
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
          <Flex align="center" gap={2} onClick={() => usuarioAbrirEdicao(usuario)}>
            <Flex align="center">
              <Avatar src={RxAvatar} size="sm" />
              <Box ml="3">
                <Text fontWeight={500} color="gray.600" fontSize={14}>
                  {usuario?.nome}
                  {usuarioAtual(usuario?.nome) && (
                    <Badge ml="1" colorScheme="green">
                      Meu usuário
                    </Badge>
                  )}
                </Text>
                <Text fontSize={13}>
                  {usuario?.email} - {getPerfilLabel(usuario?.perfil)}
                </Text>
              </Box>
            </Flex>
          </Flex>
          <IconButton
            aria-label="Editar"
            icon={<BsThreeDotsVertical />}
            variant="outline"
            size="sm"
            onClick={() => usuarioAbrirEdicao(usuario)}
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
            Usuários
          </Text>
          <Button
            variant="text"
            color="#68D391"
            leftIcon={<FaPlus />}
            onClick={usuarioAbrirCadastro}
          >
            Adicionar
          </Button>

          <Flex style={styles.content}>
            <ListaUsuarios />
          </Flex>
        </GridItem>

        <GridItem>
          <Informativo
            tipo="info"
            titulo="Administração de Usuários"
            mensagem="Gerencie, edite e organize os usuários do sistema com facilidade."
          />
        </GridItem>
      </Grid>

      <DialogModal
        isOpen={usuarioIsEditOpen}
        onClose={() => setUsuarioIsEditOpen(false)}
        title={usuarioModoEdicao ? 'Editar Usuário' : 'Adicionar Usuário'}
        onSave={salvarUsuario}
        onDelete={
          usuarioModoEdicao ? () => excluirUsuario(usuarioSelecionado?.id) : null
        }
        showDelete={usuarioModoEdicao}
      >
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Usuário</FormLabel>
            <Input
              name="nome"
              value={usuarioSelecionado?.nome || ''}
              onChange={handleChangeUsuario}
            />
          </FormControl>

          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input
              name="email"
              value={usuarioSelecionado?.email || ''}
              onChange={handleChangeUsuario}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Perfil</FormLabel>
            <Select
              name="perfil"
              value={Number(usuarioSelecionado?.perfil)}
              onChange={handleChangeUsuario}
            >
              <option value={0}>Administrador do sistema</option>
              <option value={1}>Administrador</option>
              <option value={2}>Colaborador</option>
            </Select>
          </FormControl>
          <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input 
                name='senha'
                value={usuarioSelecionado?.senha}
                onChange={handleChangeUsuario}
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
    overflowY: 'auto',
    border: '1px solid',
    borderColor: '#d0d0d0',
    borderRadius: 10,
    paddingInline: 30,
    paddingBlock: 30,
  },
};
