'use client'
import { useEffect, useState } from 'react';
import {
    Flex,
    Button,
    VStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Grid,
    GridItem,
    Text,
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react'
import {
    MdOutlineEmail
} from 'react-icons/md'
import { BsPerson } from 'react-icons/bs'
import { RxAvatar } from 'react-icons/rx';
import { getUsers } from '../../services/UsersService';

export const Perfil = () => {

    const [usuarios, setUsuarios] = useState([]); //array usuarios
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({});

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


//compoennte de lista de usuarios
const ListaUsuarios = () => {
    return (
        <List>
            {usuarios.map((usuario) => (
                <ListItem key={usuario?.id} onClick={() => { selecionarUsuario(usuario) }} style={{}}>
                    <ListIcon>
                        <RxAvatar size={20} />
                    </ListIcon>
                    {usuario?.nome}
                </ListItem>
            ))}
        </List>
    );
};


    return (
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10}>
            <GridItem>
                <Text as="b" fontSize="xl">
                    Usuários
                </Text>
                <Flex style={styles.content}>
                    <ListaUsuarios selecionarUsuario={setUsuarioSelecionado}/>
                </Flex>
            </GridItem>

            <GridItem>
                <Text as="b" fontSize="xl">
                    Perfil
                </Text>
                <Flex style={styles.content}>
                    <VStack spacing={5} w="100%">
                        <FormControl id="name">
                            <FormLabel>Usuário</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                                <InputLeftElement pointerEvents="none">
                                    <BsPerson color="gray.800" />
                                </InputLeftElement>
                                <Input type="text" size="md" />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                            <FormLabel>E-mail</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                                <InputLeftElement pointerEvents="none">
                                    <MdOutlineEmail color="gray.800" />
                                </InputLeftElement>
                                <Input type="text" size="md" />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                            <FormLabel>Permissão</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                                <InputLeftElement pointerEvents="none">
                                    <RxAvatar color="gray.800" />
                                </InputLeftElement>
                                <Input type="text" size="md" />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="name" float="right">
                            <Button variant="solid">
                                Editar usuário
                            </Button>
                        </FormControl>
                    </VStack>
                </Flex>
            </GridItem>
        </Grid>
    );
};

const styles = {
    content: {
        width: "100%",
        height: "75vh",
        border: "1px solid",
        borderColor: "#d0d0d0",
        borderRadius: 10,
        paddingInline: 30,
        paddingBlock: 30,
    },

};