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
import { ModalCadastroEmpresa } from "../components/ModalCadastroEmpresa"; // ajuste o path conforme necessário

export const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isOpen: isOpenEmpresa,
    onOpen: onOpenEmpresa,
    onClose: onCloseEmpresa,
  } = useDisclosure();

  return (
    <>
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={999}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <VStack spacing={3} align="center">
          {isOpen && (
            <>
              <Tooltip label="Gerenciar empresas" placement="left" hasArrow>
                <IconButton
                  aria-label="Gerenciar empresas"
                  icon={<FaUser />}
                  size="sm"
                  borderRadius="full"
                  bg="gray.600"
                  _hover={{ bg: "gray.500" }}
                  onClick={onOpenEmpresa} // ← ABRE MODAL
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

      {/* MODAL RENDERIZADO AQUI */}
      <ModalCadastroEmpresa isOpen={isOpenEmpresa} onClose={onCloseEmpresa} />
    </>
  );
};
