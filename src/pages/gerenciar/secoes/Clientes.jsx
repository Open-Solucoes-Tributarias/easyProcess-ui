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
    IconButton,
    Stack,
    Box,
    Avatar,
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RxAvatar, RxReader } from 'react-icons/rx';
import { FaPlus } from 'react-icons/fa';
import { DialogModal } from '../../../components/DialogModal';
import { Informativo } from '../../../components/Informativo';
import { getCliente, registerCliente } from '../../../services/ClienteService';

export const Clientes = () => {

    const [clientes, setClientes] = useState([]); //array clientes
    const [clienteSelecionado, setUsuarioSelecionado] = useState({});
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);

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
            await registerCliente(clienteSelecionado);
            alert("Usuário registrado");
            setIsEditOpen(false);
            ListarClientes(); // recarrega lista
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
                                 <RxReader/>
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
            <DialogModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title={modoEdicao ? "Editar Clientes" : "Adicionar Clientes"}
                onSave={handleSubmit}
                onDelete={modoEdicao ? () => console.log("Deletar:", clienteSelecionado) : null}
                // showDelete={modoEdicao}
            >
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Nome Fantasia</FormLabel>
                        <Input
                            value={clienteSelecionado?.nomeFantasia || ''}
                            onChange={(e) =>
                                setUsuarioSelecionado((prev) => ({ ...prev, nomeFantasia: e.target.value }))
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Razão Social</FormLabel>
                        <Input
                            value={clienteSelecionado?.razaoSocial || ''}
                            onChange={(e) =>
                                setUsuarioSelecionado((prev) => ({ ...prev, razaoSocial: e.target.value }))
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>CNPJ</FormLabel>
                        <Input
                            value={clienteSelecionado?.cnpj || ''}
                            onChange={(e) =>
                                setUsuarioSelecionado((prev) => ({ ...prev, cnpj: e.target.value }))
                            }
                        />
                    </FormControl>
                    {modoEdicao &&
                        <FormControl>
                            <FormLabel>Data de cadastro</FormLabel>
                            <Input
                                value={clienteSelecionado?.dataCadastro || ''}
                                onChange={(e) =>
                                    setUsuarioSelecionado((prev) => ({ ...prev, email: e.target.value }))
                                }
                            />
                        </FormControl>
                    }                
                </Stack>
            </DialogModal>
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