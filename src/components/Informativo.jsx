import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import { FiInbox } from "react-icons/fi";

export const Informativo = () => {
  return (
    <VStack spacing={3} textAlign="center" py={12} px={6}>
      <Icon as={FiInbox} w={12} h={12} color="gray.400" />
      <Text fontSize="1xl" fontWeight="bold">
        Nada por aqui ainda
      </Text>
      <Text color="gray.500" fontSize={14}>
        Quando houver algo para mostrar, você verá aqui.
      </Text>
    </VStack>
  );
};
