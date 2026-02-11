import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

const MotionBox = motion(Box);

const StatCard = ({ label, value, type, delay = 0 }) => {
    const config = {
        completed: { color: 'green.500', icon: FiCheckCircle, bg: 'green.50', borderColor: 'green.200' },
        pending: { color: 'orange.500', icon: FiClock, bg: 'orange.50', borderColor: 'orange.200' },
        delayed: { color: 'red.500', icon: FiAlertCircle, bg: 'red.50', borderColor: 'red.200' },
    };

    const { color, icon, bg, borderColor } = config[type] || config.pending;

    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            bg="white"
            p={6}
            borderRadius="sm" // Sharp/Professional looking
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
            position="relative"
            overflow="hidden"
            _hover={{
                borderColor: borderColor,
                boxShadow: 'md',
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out'
            }}
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                w="4px"
                h="100%"
                bg={color}
            />

            <Flex justify="space-between" align="start">
                <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.500" textTransform="uppercase" letterSpacing="wide">
                        {label}
                    </Text>
                    <Text fontSize="4xl" fontWeight="bold" color="gray.800" mt={2} lineHeight="1">
                        {value}
                    </Text>
                </Box>
                <Flex
                    align="center"
                    justify="center"
                    w={12}
                    h={12}
                    bg={bg}
                    borderRadius="sm"
                    color={color}
                >
                    <Icon as={icon} w={6} h={6} />
                </Flex>
            </Flex>
        </MotionBox>
    );
};

export default StatCard;
