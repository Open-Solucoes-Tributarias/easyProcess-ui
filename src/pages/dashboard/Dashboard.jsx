"use client";
import { useEffect, useState } from "react";
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Heading,
  Badge,
  Stack,
} from '@chakra-ui/react';
import { CheckIcon } from "@chakra-ui/icons";
import { getResumo } from "../../services/resumeService";

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
      <Box maxW="7xl" mx="auto" py={8} px={6}>
        <chakra.h1 textAlign="center" fontSize="4xl" fontWeight="bold" mb={10}>
          Suas estatísticas atuais
        </chakra.h1>

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
      </Box>
  );
};
