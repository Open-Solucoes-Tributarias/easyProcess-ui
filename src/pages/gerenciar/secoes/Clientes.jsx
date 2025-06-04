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
import { getCliente } from '../../../services/ClienteService';

export const Clientes = () => {

    const [clientes, setClientes] = useState([]); //array clientes
    const [clienteSelecionado, setUsuarioSelecionado] = useState({});
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);

    //mock 
    const clientesMock = [
        {
            id: 1,
            nomeFantasia: "Tech Solutions",
            razaoSocial: "Tech Solutions Tecnologia LTDA",
            cnpj: "12.345.678/0001-90",
            dataCadastro: "2025-06-04T15:27:44.273Z"
        },
        {
            id: 2,
            nomeFantasia: "Construtora Alpha",
            razaoSocial: "Construtora Alpha Engenharia e Serviços LTDA",
            cnpj: "98.765.432/0001-12",
            dataCadastro: "2025-05-28T09:13:00.000Z"
        }
    ];

    //funcao buscar dados dos clientes
    const ListarClientes = async () => {
        try {
            const dadosClientes = await getCliente();
            setClientes(dadosClientes);

        } catch (error) {
            console.error("não foi possivel buscar clientes")
        };
        
    };

    useEffect(() => {
        ListarClientes();
    }, []);
    

    //enviar dados do cliente

    const handleSubmit = async () => {
        try {
            await registerUser(clienteSelecionado);
            alert("Usuário registrado");
            setIsEditOpen(false);
            // ListarClientes(); // recarrega lista
        } catch (error) {
            console.error("Erro ao registrar usuário", error);
        }
    };

    //componente de lista de clientes
    const ListaClientes = ({ selecionarUsuario, abrirModalEdicao }) => {
        return (
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
                        <Flex align="center" gap={2} onClick={() => selecionarUsuario(cliente)}>
                            <Flex align="center">
                                <Avatar src={RxAvatar} size='sm' />
                                <Box ml='3'>
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
                            onClick={() => {
                                selecionarUsuario(cliente);
                                setModoEdicao(true);
                                abrirModalEdicao();
                            }}
                        />
                    </ListItem>
                ))}
            </List>

        );
    };

      console.log(clientes)



    return (
        <>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10}>
                
                <GridItem>
                    <Text as="b" fontSize="xl">
                        Clientes
                    </Text>
                    <Button variant='text' color='#68D391' leftIcon={<FaPlus />} onClick={() => {
                        setUsuarioSelecionado({});
                        setModoEdicao(false); // define modo de adicionar
                        setIsEditOpen(true);
                    }}>
                        Adicionar
                    </Button>
                    <Flex style={styles.content}>
                        <ListaClientes
                            selecionarUsuario={setUsuarioSelecionado}
                            abrirModalEdicao={() => setIsEditOpen(true)}
                        />
                    </Flex>
                </GridItem>
                <GridItem>
                    <Informativo
                        tipo="info"
                        titulo="Gerenciamento de Clientes"
                        mensagem="Clientes são empresas às quais devem ser atribuídos processos e fluxos de trabalho, organizados em frentes que contêm atividades específicas. Cada frente possui supervisores responsáveis pelo acompanhamento da demanda e executores encarregados de sua realização."
                    />
                </GridItem>
            </Grid>
            {/* <DialogModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title={modoEdicao ? "Editar Usuário" : "Adicionar Usuário"}
                onSave={handleSubmit}
                onDelete={modoEdicao ? () => console.log("Deletar:", clienteSelecionado) : null}
                // showDelete={modoEdicao}
            >
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Usuário</FormLabel>
                        <Input
                            value={clienteSelecionado?.nome || ''}
                            onChange={(e) =>
                                setUsuarioSelecionado((prev) => ({ ...prev, nome: e.target.value }))
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                            value={clienteSelecionado?.email || ''}
                            onChange={(e) =>
                                setUsuarioSelecionado((prev) => ({ ...prev, email: e.target.value }))
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Perfil</FormLabel>
                        <Select
                            value={clienteSelecionado?.perfil ?? ''}
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
            </DialogModal> */}
        </>
    );
};

const styles = {
    content: {
        width: "100%",
        minHeight: "50vh",
        height: "100%",
        overflowY: "auto",
        border: "1px solid",
        borderColor: "#d0d0d0",
        borderRadius: 10,
        paddingInline: 30,
        paddingBlock: 30,
    },

};