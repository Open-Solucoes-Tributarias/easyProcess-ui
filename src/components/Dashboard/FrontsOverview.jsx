import { Box, Text, VStack, SimpleGrid, Badge, Icon, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiArrowRight } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
};

const FrontsOverview = ({ data }) => {
    // Group data by company
    const groupedData = data.reduce((acc, curr) => {
        if (!acc[curr.empresa]) {
            acc[curr.empresa] = [];
        }
        acc[curr.empresa].push(curr.frenteDeTrabalhoNome);
        return acc;
    }, {});

    return (
        <Box>
            <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.800">
                Frentes de Trabalho Ativas
            </Text>
            <VStack spacing={4} align="stretch" as={motion.div} variants={container} initial="hidden" animate="show">
                {Object.entries(groupedData).map(([company, fronts]) => (
                    <MotionBox
                        key={company}
                        variants={item}
                        bg="white"
                        p={5}
                        borderRadius="sm"
                        border="1px solid"
                        borderColor="gray.200"
                        role="group"
                        position="relative"
                        overflow="hidden"
                        _hover={{ borderColor: 'blue.400' }}
                        transition="all 0.2s"
                    >
                        <Box
                            position="absolute"
                            left={0}
                            top={0}
                            bottom={0}
                            w="3px"
                            bg="blue.500"
                            opacity={0}
                            _groupHover={{ opacity: 1 }}
                            transition="opacity 0.2s"
                        />

                        <Flex align="center" mb={3}>
                            <Icon as={FiBriefcase} color="gray.400" mr={2} />
                            <Text fontWeight="semibold" color="gray.700">{company}</Text>
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                            {fronts.map((front, idx) => (
                                <Flex key={idx} align="center">
                                    <Icon as={FiArrowRight} color="blue.300" w={3} h={3} mr={2} />
                                    <Text fontSize="sm" color="gray.600">{front}</Text>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </MotionBox>
                ))}
            </VStack>
        </Box>
    );
};

export default FrontsOverview;
