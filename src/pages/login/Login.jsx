'use client';
import imageLogin from "../../../src/assets/background.png";
import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
  Tooltip,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    const payload = { email, senha: password };

    try {
      setLoading(true);
      const response = await login(payload);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      toast({
        title: 'Login realizado com sucesso.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Erro ao fazer login.',
        description: 'Verifique seu e-mail e senha.',
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
          <Heading fontSize={'2xl'}></Heading>
          <FormControl id="email">
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
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
              <Tooltip label="Função em desenvolvimento">
                <Text color={'blue.500'} cursor={'not-allowed'} fontStyle={'italic'}>
                  Esqueci a senha
                </Text>
              </Tooltip>
              {/* <Link onClick={() => navigate('/cadastro')}>Primeiro acesso</Link> */}
            </Stack>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              isLoading={loading}
              onClick={handleSubmit}>
              Acessar
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} backgroundColor='#68da76'>
        <Image
          alt={'Login Image'}
          objectFit='contain'
          maxHeight={'100%'}
          maxWidth={'100%'}
          src={imageLogin}
        />
      </Flex>
    </Stack>
  );
};
