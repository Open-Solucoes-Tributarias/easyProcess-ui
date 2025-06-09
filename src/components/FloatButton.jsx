import { useState } from "react";
import {
  Box,
  IconButton,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { DialogModal } from "./DialogModal"; // ajuste o caminho conforme necessário

export const FloatButton = ({ actions = [] }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const handleOpenModal = (index) => setActiveModalIndex(index);
  const handleCloseModal = () => setActiveModalIndex(null);

  return (
    <>
      {/* Renderiza modais dinamicamente */}
      {actions.map((action, index) =>
        action.modalBody ? (
          <DialogModal
            key={`modal-${index}`}
            isOpen={activeModalIndex === index}
            onClose={handleCloseModal}
            title={action.modalTitle || action.label}
            size={action.modalSize || "xl"}
            onSave={action.onSave}
            onDelete={action.onDelete}
            showDelete={action.showDelete}
          >
            {action.modalBody}
          </DialogModal>
        ) : null
      )}

      <Box
        position="fixed"
        bottom="25px"
        right="25px"
        zIndex={999}
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        <VStack spacing={3} align="center">
          {showButtons &&
            actions.map((action, index) => (
              <Tooltip key={`btn-${index}`} label={action.label} placement="left" hasArrow>
                <IconButton
                  aria-label={action.label}
                  icon={action.icon}
                  size="sm"
                  borderRadius="full"
                  bg="gray.600"
                  _hover={{ bg: "gray.500" }}
                  onClick={() => handleOpenModal(index)}
                />
              </Tooltip>
            ))}

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
