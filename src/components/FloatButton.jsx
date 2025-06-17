import { useState } from "react";
import {
  Box,
  IconButton,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export const FloatButton = ({ actions = [] }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [activeComponentIndex, setActiveComponentIndex] = useState(null);

  const handleOpenComponent = (index) => setActiveComponentIndex(index);
  const handleCloseComponent = () => setActiveComponentIndex(null);

  return (
    <>
      {/* Renderiza os componentes dinamicamente */}
      {actions.map((action, index) =>
        activeComponentIndex === index && action.component ? (
          <Box key={`component-${index}`} position="fixed" bottom="100px" right="25px" zIndex={998}>
            {typeof action.component === "function"
              ? action.component({ onClose: handleCloseComponent })
              : action.component}
          </Box>
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
                  onClick={() => handleOpenComponent(index)}
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
