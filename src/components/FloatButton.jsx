import {
  Box,
  IconButton,
  VStack,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FaUser, FaPaperclip, FaClipboardList } from "react-icons/fa";
import { useState } from "react";
// import { ModalCadastroCliente } from "./ModalCadastroCliente"; // ajuste o path conforme necessário

export const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isOpen: isOpenCliente,
    onOpen: onOpenCliente,
    onClose: onCloseCliente,
  } = useDisclosure();

  return (
    <>
      <Box
        position="fixed"
        bottom="25px"
        right="25px"
        zIndex={999}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <VStack spacing={3} align="center">
          {isOpen && (
            <>
              <Tooltip label="Gerenciar clientes" placement="left" hasArrow>
                <IconButton
                  aria-label="Gerenciar clientes"
                  icon={<FaUser />}
                  size="sm"
                  borderRadius="full"
                  bg="gray.600"
                  _hover={{ bg: "gray.500" }}
                  onClick={onOpenCliente} // ← ABRE MODAL
                />
              </Tooltip>

              <Tooltip label="Gerenciar FT's" placement="left" hasArrow>
                <IconButton
                  aria-label="Anexar"
                  icon={<FaPaperclip />}
                  size="sm"
                  borderRadius="full"
                  bg="gray.600"
                  _hover={{ bg: "gray.500" }}
                />
              </Tooltip>

              <Tooltip label="Gerenciar atividades" placement="left" hasArrow>
                <IconButton
                  aria-label="Ver tarefas"
                  icon={<FaClipboardList />}
                  size="sm"
                  borderRadius="full"
                  bg="gray.600"
                  _hover={{ bg: "gray.500" }}
                />
              </Tooltip>
            </>
          )}

          <IconButton
            aria-label="Abrir menu"
            icon={<AddIcon />}
            size="lg"
            isRound
            bg="green.400"
            color="white"
            _hover={{ bg: "green.500" }}
          />
        </VStack>
      </Box>
    </>
  );
};
