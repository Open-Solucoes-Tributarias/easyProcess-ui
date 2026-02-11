import { Box, Grid, GridItem, Heading, SimpleGrid, Container, Spinner, Flex, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getResumo } from '../../services/resumeService';
import StatCard from '../../components/Dashboard/StatCard';
import ActivitiesChart from '../../components/Dashboard/ActivitiesChart';
import FrontsOverview from '../../components/Dashboard/FrontsOverview';
import UserPerformance from '../../components/Dashboard/UserPerformance';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseCallback = await getResumo();

        // Transform API data to match component expectations if necessary
        // Assuming response structure matches the mock data provided by user
        // We might need to map 'atividadesPorFrente' for the chart if the API returns raw data
        const formattedChartData = responseCallback.atividadesPorFrente?.map(item => ({
          name: item.frenteDeTrabalho, // Mapping 'frenteDeTrabalho' to 'name' for Recharts
          value: item.totalAtividades // 'totalAtividades' is already correct
        })) || [];

        setData({
          ...responseCallback,
          atividadesPorFrente: formattedChartData
        });
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard:", err);
        setError("Não foi possível carregar os dados do dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg="gray.50">
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg="gray.50" p={4}>
        <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyItems="center" textAlign="center" borderRadius="md" maxW="md">
          <AlertIcon boxSize="40px" mr={0} />
          <Text mt={4} mb={1} fontSize="lg" fontWeight="bold">
            Erro ao carregar
          </Text>
          <Text maxWidth="sm">{error}</Text>
        </Alert>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" py={4}>
      <Container maxW="full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading mb={6} color="gray.800" fontSize="2xl" fontWeight="bold">
            Dashboard de Controle
          </Heading>
        </motion.div>

        {/* Stats Row */}
        {data?.statusResumo && (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
            <StatCard
              label="Concluídas"
              value={data.statusResumo.totalConcluidas}
              type="completed"
              delay={0.1}
            />
            <StatCard
              label="Pendentes"
              value={data.statusResumo.totalPendentes}
              type="pending"
              delay={0.2}
            />
            <StatCard
              label="Atrasadas"
              value={data.statusResumo.totalAtrasadas}
              type="delayed"
              delay={0.3}
            />
          </SimpleGrid>
        )}

        {/* Main Content Grid */}
        <Grid
          templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
          gap={6}
          mb={8}
        >
          <GridItem>
            {data?.atividadesPorFrente && (
              <ActivitiesChart data={data.atividadesPorFrente} delay={0.4} />
            )}
          </GridItem>
          <GridItem>
            {data?.atividadesPorUsuario && (
              <UserPerformance data={data.atividadesPorUsuario} delay={0.5} />
            )}
          </GridItem>
        </Grid>

        {/* Secondary Content */}
        <Grid templateColumns={{ base: "1fr" }} gap={6}>
          <GridItem>
            {data?.frentesPorEmpresa && (
              <FrontsOverview data={data.frentesPorEmpresa} />
            )}
          </GridItem>
        </Grid>

      </Container>
    </Box>
  );
};

export default Dashboard;
