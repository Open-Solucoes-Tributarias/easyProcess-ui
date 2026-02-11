import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Avatar, Progress, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionTr = motion(Tr);

const UserPerformance = ({ data, delay = 0.4 }) => {
    return (
        <Box
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            bg="white"
            p={6}
            borderRadius="sm"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
        >
            <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.800">
                Desempenho da Equipe
            </Text>
            <Box overflowX="auto">
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th color="gray.500">Usuário</Th>
                            <Th color="gray.500" isNumeric>Atividades</Th>
                            <Th color="gray.500" width="40%">Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((user, index) => (
                            <MotionTr
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: delay + (index * 0.1) }}
                                _hover={{ bg: 'gray.50' }}
                            >
                                <Td>
                                    <Box display="flex" alignItems="center">
                                        <Avatar size="xs" name={user.usuarioNome} mr={2} bg="blue.500" color="white" />
                                        <Text fontWeight="medium" color="gray.700">{user.usuarioNome}</Text>
                                    </Box>
                                </Td>
                                <Td isNumeric fontWeight="bold" color="blue.600">
                                    {user.totalAtividades}
                                </Td>
                                <Td>
                                    <Tooltip label={`${user.totalAtividades} atividades designadas`} hasArrow>
                                        <Progress
                                            value={Math.min(user.totalAtividades, 100)}
                                            max={200} // Assuming 200 is a reasonable max for visualization scale
                                            size="sm"
                                            colorScheme="blue"
                                            borderRadius="full"
                                        />
                                    </Tooltip>
                                </Td>
                            </MotionTr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default UserPerformance;
