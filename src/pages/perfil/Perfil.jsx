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
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RxAvatar } from 'react-icons/rx';
import { getUsers } from '../../services/UsersService';
import { FaPlus } from 'react-icons/fa';
import { DialogModal } from '../../components/DialogModal';
import { getPerfilLabel } from '../../utils/labelUtils';

export const Perfil = () => {

    const [usuarios, setUsuarios] = useState([]); //array usuarios
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
    const [isEditOpen, setIsEditOpen] = useState(false);

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
                            <ListIcon as={RxAvatar} color="gray.600" />
                            <Flex direction={'column'}>
                                <Text>{usuario?.nome}</Text>
                                <Text fontSize={12} fontStyle={'italic'}>{usuario?.email} - {getPerfilLabel(usuario?.perfil)}</Text>
                            </Flex>
                        </Flex>
                        <IconButton
                            aria-label="Editar"
                            icon={<BsThreeDotsVertical />}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                selecionarUsuario(usuario);
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
                    <Button variant='text' color='#68D391' leftIcon={<FaPlus />}>
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

                </GridItem>
            </Grid>
            <DialogModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title="Editar Usuário"
                onSave={() => console.log("Salvar:", usuarioSelecionado)}
                onDelete={() => console.log("Deletar:", usuarioSelecionado)}
                showDelete
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
        height: "75vh",
        overflowY: "auto",
        border: "1px solid",
        borderColor: "#d0d0d0",
        borderRadius: 10,
        paddingInline: 30,
        paddingBlock: 30,
    },

};