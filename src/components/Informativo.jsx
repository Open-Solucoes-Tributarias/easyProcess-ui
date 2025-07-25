import { Icon, Progress, Text, VStack } from "@chakra-ui/react";
import { InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { FiInbox } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";

const tipoPadrao = {
  default: {
    icon: FiInbox,
    color: "gray.400",
    titulo: "Nada por aqui ainda",
    mensagem: "Quando houver algo para mostrar, você verá aqui.",
  },
  info: {
    icon: InfoIcon,
    color: "#48bb78",
  },
  alerta: {
    icon: WarningIcon,
    color: "orange.400",
  },
  erro: {
    icon: MdErrorOutline,
    color: "red.500",
  },
  carregando: {
    titulo: null,
    mensagem: "Por favor, aguarde enquanto carregamos os dados.",
    color: "blue.500",
  },
};

export const Informativo = ({ tipo = "default", titulo, mensagem }) => {
  const fallback = tipoPadrao[tipo] || tipoPadrao["default"];

  return (
    <VStack spacing={3} textAlign="center" py={12} px={6}>
         {/* apenas trocar o <Icon> por <Progress> quando for "carregando" */}
      {tipo === "carregando" ? (
        <Progress
          isIndeterminate
          width='25%'
          size="xs"
          colorScheme="green"
        />
      ) : (
        <Icon
          as={fallback.icon}
          w={12}
          h={12}
          color={fallback.color}
        />
      )}
      <Text fontSize="1xl" fontWeight="bold">
        {titulo || fallback.titulo}
      </Text>
      <Text color="gray.500" fontSize={14}>
        {mensagem || fallback.mensagem}
      </Text>
    </VStack>
  );
};
