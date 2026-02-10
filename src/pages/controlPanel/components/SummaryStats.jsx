import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Icon, Flex } from "@chakra-ui/react";
import { FaTasks, FaCheckCircle, FaExclamationTriangle, FaHourglassHalf } from "react-icons/fa";

export const SummaryStats = ({ atividades }) => {
    if (!atividades || atividades.length === 0) return null;

    const total = atividades.length;
    const concluidas = atividades.filter(a => a.statusAtividade === 2).length;
    const emAndamento = atividades.filter(a => a.statusAtividade === 1).length;
    // Atrasadas: Status 3 OR (Status != 2 AND DataLimite < Now)
    // For simplicity based on current icons logic: Status 3 is "Exclamation/Attention". 
    // Often "Atrasada" is calculated. 
    // Let's rely on statusAtividade for now if the backend marks it, 
    // otherwise we can add date comparison. 
    // For now, let's assume statusAtividade 3 is "Atrasada/Attention".
    // If the user wants strictly date based, we can add:
    // const atrasadas = atividades.filter(a => a.statusAtividade !== 2 && new Date(a.dataLimite) < new Date()).length;
    const atrasadas = atividades.filter(a => a.statusAtividade === 3).length;

    const stats = [
        { label: "Total de Atividades", value: total, icon: FaTasks, color: "blue.500" },
        { label: "Concluídas", value: concluidas, icon: FaCheckCircle, color: "green.500" },
        { label: "Em Andamento", value: emAndamento, icon: FaHourglassHalf, color: "orange.500" },
        { label: "Atenção / Atrasadas", value: atrasadas, icon: FaExclamationTriangle, color: "red.500" },
    ];

    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={6}>
            {stats.map((stat, index) => (
                <Box
                    key={index}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="lg"
                    bg="white"
                    _hover={{ shadow: "lg", transform: "translateY(-2px)", transition: "all 0.2s" }}
                >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Box>
                            <Stat>
                                <StatLabel fontSize="sm" color="gray.500">{stat.label}</StatLabel>
                                <StatNumber fontSize="2xl" fontWeight="bold">{stat.value}</StatNumber>
                            </Stat>
                        </Box>
                        <Icon as={stat.icon} w={8} h={8} color={stat.color} opacity={0.8} />
                    </Flex>
                    {/* 
          <StatHelpText mb={0}>
             Optional: Difference from last month, etc.
          </StatHelpText> 
          */}
                </Box>
            ))}
        </SimpleGrid>
    );
};
