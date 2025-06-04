'use client'
import { useEffect, useState } from 'react';
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
    ListIcon,
    Select,
    IconButton,
    Stack,
    Box,
    Badge,
    Avatar,
    Heading,
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RxAvatar } from 'react-icons/rx';
import { getUsers, registerUser } from '../../../services/UsersService';
import { FaPlus } from 'react-icons/fa';
import { DialogModal } from '../../../components/DialogModal';
import { getPerfilLabel } from '../../../utils/labelUtils';
import { InfoIcon } from '@chakra-ui/icons';
import { Informativo } from '../../../components/Informativo';

export const Perfil = () => {

    const [usuarios, setUsuarios] = useState([]); //array usuarios
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);

    //funcao buscar dados dos usuarios
    const ListarUsuarios = async () => {
        try {
            const dadosUsuarios = await getUsers();
            setUsuarios(dadosUsuarios);

        } catch (error) {
            console.error("não foi possivel buscar usuarios")
        };
    };

    useEffect(() => {
        ListarUsuarios();
    }, []);

    //enviar dados do usuario

const handleSubmit = async () => {
  try {
    await registerUser(usuarioSelecionado);
    alert("Usuário registrado");
    setIsEditOpen(false);
    // ListarUsuarios(); // recarrega lista
  } catch (error) {
    console.error("Erro ao registrar usuário", error);
  }
};

    //Indica o usuario atual na lista
    const usuarioAtual = (userName) => {
        const userData = localStorage.getItem('user');
        if (!userData) return false;

        try {
            const user = JSON.parse(userData);
            return userName === user.usuario;
        } catch (err) {
            return false;
        }
    };


    //componente de lista de usuarios
    const ListaUsuarios = ({ selecionarUsuario, abrirModalEdicao }) => {
        return (
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
                        <Flex align="center" gap={2} onClick={() => selecionarUsuario(usuario)}>
                            <Flex align="center">
                                <Avatar src={RxAvatar} size='sm' />
                                <Box ml='3'>
                                    <Text fontWeight={500} color="gray.600" fontSize={14}>
                                        {usuario?.nome}
                                        {usuarioAtual(usuario?.nome) && (
                                            <Badge ml='1' colorScheme='green'>
                                                Meu usuário
                                            </Badge>
                                        )}
                                    </Text>
                                    <Text fontSize={13}>{usuario?.email} - {getPerfilLabel(usuario?.perfil)}</Text>
                                </Box>
                            </Flex>
                        </Flex>
                        <IconButton
                            aria-label="Editar"
                            icon={<BsThreeDotsVertical />}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                selecionarUsuario(usuario);
                                setModoEdicao(true);
                                abrirModalEdicao();
                            }}
                        />
                    </ListItem>
                ))}
            </List>

        );
    };



    return (
        <>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10}>
                
                <GridItem>
                    <Text as="b" fontSize="xl">
                        Usuários
                    </Text>
                    <Button variant='text' color='#68D391' leftIcon={<FaPlus />} onClick={() => {
                        setUsuarioSelecionado({});
                        setModoEdicao(false); // define modo de adicionar
                        setIsEditOpen(true);
                    }}>
                        Adicionar
                    </Button>
                    <Flex style={styles.content}>
                        <ListaUsuarios
                            selecionarUsuario={setUsuarioSelecionado}
                            abrirModalEdicao={() => setIsEditOpen(true)}
                        />
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
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title={modoEdicao ? "Editar Usuário" : "Adicionar Usuário"}
                onSave={handleSubmit}
                onDelete={modoEdicao ? () => console.log("Deletar:", usuarioSelecionado) : null}
                // showDelete={modoEdicao}
            >
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Usuário</FormLabel>
                        <Input
                            value={usuarioSelecionado?.nome || ''}
                            onChange={(e) =>
                                setUsuarioSelecionado((prev) => ({ ...prev, nome: e.target.value }))
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                            value={usuarioSelecionado?.email || ''}
                            onChange={(e) =>
                                setUsuarioSelecionado((prev) => ({ ...prev, email: e.target.value }))
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Perfil</FormLabel>
                        <Select
                            value={usuarioSelecionado?.perfil ?? ''}
                            onChange={(e) =>
                                setUsuarioSelecionado((prev) => ({
                                    ...prev,
                                    perfil: Number(e.target.value),
                                }))
                            }
                        >
                            <option value={0}>Administrador do sistema</option>
                            <option value={1}>Administrador</option>
                            <option value={2}>Supervisor</option>
                            <option value={3}>Colaborador</option>
                        </Select>
                    </FormControl>
                </Stack>
            </DialogModal>
        </>
    );
};

const styles = {
    content: {
        width: "100%",
        // height: "75vh",
        // maxheight: "75vh",
        overflowY: "auto",
        border: "1px solid",
        borderColor: "#d0d0d0",
        borderRadius: 10,
        paddingInline: 30,
        paddingBlock: 30,
    },

};