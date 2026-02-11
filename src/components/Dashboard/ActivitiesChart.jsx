import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Box
                bg="white"
                p={3}
                border="1px solid"
                borderColor="gray.200"
                boxShadow="md"
                borderRadius="sm"
            >
                <Text fontWeight="bold" fontSize="sm" color="gray.700">
                    {label}
                </Text>
                <Text fontSize="sm" color="blue.600">
                    Atividades: {payload[0].value}
                </Text>
            </Box>
        );
    }
    return null;
};

const ActivitiesChart = ({ data, delay = 0.2 }) => {
    // Format data specifically for the chart if needed, or assume passed prop is correct
    // The structure expected is array of objects { name: string, value: number }

    return (
        <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            bg="white"
            p={6}
            borderRadius="sm"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
            h="400px" // Fixed height for chart container
            w="100%"
        >
            <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.800">
                Atividades por Frente
            </Text>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        width={150}
                        tick={{ fontSize: 12, fill: '#4A5568' }}
                        interval={0}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                    <Bar
                        dataKey="value"
                        fill="#3182CE" // Professional Blue
                        radius={[0, 4, 4, 0]} // Sharp edges on left, slightly rounded on right for modern feel
                        barSize={20}
                    />
                </BarChart>
            </ResponsiveContainer>
        </MotionBox>
    );
};

export default ActivitiesChart;
