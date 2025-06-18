'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Tooltip,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

export const FloatFormButton = ({ formUrl }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [iframeKey, setIframeKey] = useState(0); // para forçar reload se quiser

    const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 3000); // fecha após 5 segundos (ex: 30000 para 30s, 180000 para 3 min)

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Botão flutuante */}
      <Box
        position="fixed"
        bottom="30px"
        right="30px"
        zIndex="999"
      >
        <Tooltip label='Registre um solicitação, dúvida ou melhoria' placement='left-start' isOpen={isTooltipOpen}
      closeOnPointerDown hasArrow>
        <IconButton
          icon={<ChatIcon />}
          colorScheme="whatsapp"
          borderRadius="full"
          size="lg"
          boxShadow="lg"
          aria-label="Abrir formulário"
          onClick={() => {
            setIframeKey((prev) => prev + 1); // reload opcional
            onOpen();
          }}
        />
        </Tooltip>
      </Box>
      {/* Modal com iframe */}
      <Modal isOpen={isOpen} onClose={onClose} size='6xl' isCentered>
        <ModalOverlay />
        <ModalContent height="80vh">
          <ModalHeader>Canal de Feedback e Suporte à Ferramenta</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <Box as="iframe"
              key={iframeKey}
              src={formUrl}
              width="100%"
              height="100%"
              border="none"
              style={{ borderRadius: '0 0 8px 8px' }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
