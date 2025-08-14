"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Heading,
  Badge,
  Stack,
  Link,
  IconButton,
} from '@chakra-ui/react';
import { CheckIcon } from "@chakra-ui/icons";
import { getResumo } from "../../services/resumeService";
import { FaUserGroup, FaUserTie, FaRegFolderOpen, FaChartGantt, FaCheckDouble } from "react-icons/fa6";

function StatsCard({ title, stat, icon }) {
  return (
    <Stat
      px={4}
      py={5}
      shadow={'md'}
      border={'1px solid'}
      borderColor={'gray.200'}
      rounded={'lg'}
      bg="white"
    >
      <Flex justifyContent={'space-between'}>
        <Box>
          <StatLabel fontWeight="medium" color="gray.600">{title}</StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight="bold">{stat}</StatNumber>
        </Box>
        <Box my={'auto'} color={'blue.500'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

function CardActions({ text, url, icon }) {
  return (
     <Link href={url} target="_self" _hover={{ textDecoration: 'none' }} w={'100%'}>
      <Flex p={5} borderWidth="1px" align='center' borderColor="gray.200" borderRadius="md" bg="white" _hover={{ bg: 'gray.50', borderColor: '#68D391' }} w='100%'>
        <IconButton variant='ghost'>
          {icon}
        </IconButton><Text>{text}</Text>
      </Flex>
    </Link>
  );
};

export const Dashboard = () => {
  const [estatisticas, setEstatisticas] = useState(null);

  useEffect(() => {
    const fetchResumo = async () => {
      try {
        const dados = await getResumo();
        setEstatisticas(dados);
      } catch (err) {
        console.error('Erro ao buscar resumo:', err);
      }
    };

    fetchResumo();
  }, []);

  const status = estatisticas?.statusResumo;
  const frentesPorCliente = estatisticas?.frentesPorCliente || [];
  const atividadesPorFrente = estatisticas?.atividadesPorFrente || [];
  const atividadesPorUsuario = estatisticas?.atividadesPorUsuario || [];

  const frentesAgrupadas = frentesPorCliente.reduce((acc, item) => {
    if (!acc[item.cliente]) acc[item.cliente] = [];
    acc[item.cliente].push(item.frenteDeTrabalhoNome);
    return acc;
  }, {});

  return (
    <Flex direction='column' gap={2} py={3} px={3}>
      <Flex direction='column' gap={3} pb={5}>
        <Heading size='md'>Ações rápidas</Heading>
        <Flex direction='row' gap={2} w='100%'>
          <CardActions text={"Painel de controle"} url={"/painel"} icon={<FaChartGantt />} />
          <CardActions text={"Frentes e atividades"} url={"/frentes"} icon={<FaCheckDouble />} />
          <CardActions text={"Contratos"} url={"/contratos"} icon={<FaRegFolderOpen />} />
          <CardActions text={"Meus clientes"} url={"/clientes"} icon={<FaUserTie />} />
          <CardActions text={"Meus usuários"} url={"/usuarios"} icon={<FaUserGroup />} />
        </Flex>
      </Flex> 
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
          <StatsCard title="Atividades concluídas" stat={`${status?.totalConcluidas ?? 0}`} icon={<CheckIcon color={"green"} />} />
          <StatsCard title="Atividade pendentes" stat={`${status?.totalPendentes ?? 0}`} icon={<CheckIcon />} />
          <StatsCard title="Atividade atrasadas" stat={`${status?.totalAtrasadas ?? 0}`} icon={<CheckIcon color={"red"} />} />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box p={5} border="1px solid" borderColor="gray.200" borderRadius="md" bg="white">
            <Heading size="md" mb={4}>Frentes por Cliente</Heading>
            <Stack spacing={4}>
              {Object.entries(frentesAgrupadas).map(([cliente, frentes]) => (
                <Box key={cliente}>
                  <Text fontWeight="semibold" color="gray.700" mb={1}>{cliente}</Text>
                  <Flex wrap="wrap" gap={2}>
                    {frentes.map((f, i) => (
                      <Badge key={i} colorScheme="blue">{f}</Badge>
                    ))}
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box p={5} border="1px solid" borderColor="gray.200" borderRadius="md" bg="white">
            <Heading size="md" mb={4}>Atividades por Frente</Heading>
            <Stack spacing={3}>
              {atividadesPorFrente.map((item, i) => (
                <Flex key={i} justify="space-between">
                  <Text color="gray.700">{item.frenteDeTrabalho}</Text>
                  <Text fontWeight="bold">{item.totalAtividades}</Text>
                </Flex>
              ))}
            </Stack>
          </Box>

          <Box p={5} border="1px solid" borderColor="gray.200" borderRadius="md" bg="white">
            <Heading size="md" mb={4}>Atividades por Usuário</Heading>
            <Stack spacing={3}>
              {atividadesPorUsuario.map((item, i) => (
                <Flex key={i} justify="space-between">
                  <Text color="gray.700">{item.usuarioNome}</Text>
                  <Text fontWeight="bold">{item.totalAtividades}</Text>
                </Flex>
              ))}
            </Stack>
          </Box>
        </SimpleGrid>
      </Flex>
  );
};
