'use client';
import imageLogin from "/easyProcess-ui/src/assets/imgLogin.png";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from "../../services/registerService";

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    const payload = {
      nome,
      email,
      senha: password,
      clienteId: null,
      perfil: 0,
    };

    try {
      setLoading(true);
      const response = await register(payload);
      localStorage.setItem('token', response.token);
      toast({
        title: 'Cadastro realizado com sucesso.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar.',
        description: 'Verifique os dados e tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Image width={60} src="/logoEp.svg" alt="Logo" />
          <Heading fontSize={'2xl'}>Crie sua conta</Heading>
          <FormControl id="nome" isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'row', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Link onClick={() => navigate('/')}>Já tenho uma conta</Link>
            </Stack>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              isLoading={loading}
              onClick={handleSubmit}>
              Cadastrar
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Imagem de Cadastro'}
          objectFit={'fill'}
          maxHeight={'100%'}
          maxWidth={'100%'}
          src={imageLogin}
        />
      </Flex>
    </Stack>
  );
};
