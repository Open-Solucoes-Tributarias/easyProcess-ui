"use client";
import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Tag,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Contratos } from "./sections/Contratos";
import { AtvContrato } from "./sections/AtvContrato";
import { FaBars, FaCalendarAlt, FaPlus, FaUserTie } from "react-icons/fa";
import { AtividadeContrato } from "./components/AtividadeContrato";
import { useAtividadesContrato } from "../../hooks/useAtividadesContrato";
import { SummaryStats } from "./components/SummaryStats";
import { dateConverter } from "../../utils/utils";

export const Painel = () => {
  const [contratoSelecionado, setContratoSelecionado] = useState(null);
  const [modalAtividadeAberto, setModalAtividadeAberto] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Lifted state to share between SummaryStats and AtvContrato
  const {
    atividadesContrato,
    listarAtividadesContrato,
    setAtividadeSelecionada,
    atividadeSelecionada,
    modalEditarAberto,
    setModalEditarAberto,
    loadingAtividades,
  } = useAtividadesContrato();

  useEffect(() => {
    if (contratoSelecionado?.id) {
      listarAtividadesContrato(contratoSelecionado.id);
    }
  }, [contratoSelecionado]);

  const handleSelectContrato = (contrato) => {
    setContratoSelecionado(contrato);
    onClose();
  };

  return (
    <Box p={4} maxW="100vw" overflowX="hidden">
      <Flex justifyContent="space-between" alignItems="start" mb={6} flexWrap="wrap" gap={4}>
        <Flex gap={4} alignItems="start">
          <Button
            leftIcon={<FaBars />}
            onClick={onOpen}
            variant="solid"
            mt={1}
          >
            Selecionar Contrato
          </Button>
          {contratoSelecionado && (
            <VStack align="start" spacing={1}>
              <Heading size="md" color="gray.700">
                {contratoSelecionado.descricao}
              </Heading>

              <HStack spacing={4} wrap="wrap">
                {contratoSelecionado.cliente && (
                  <Tag size="sm" variant="subtle" colorScheme="blue">
                    {contratoSelecionado.cliente.razaoSocial}
                  </Tag>
                )}

                <HStack spacing={1}>
                  <Icon as={FaUserTie} size="sm" color="gray.500" />
                  <Text fontSize="sm" color="gray.600">
                    {contratoSelecionado.nomeSupervisor || "Sem supervisor"}
                  </Text>
                </HStack>

                <HStack spacing={1}>
                  <Icon as={FaCalendarAlt} size="sm" color="gray.500" />
                  <Text fontSize="sm" color="gray.600">
                    {dateConverter(contratoSelecionado.dataInicio)} - {dateConverter(contratoSelecionado.dataFim)}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          )}
        </Flex>

        {contratoSelecionado && (
          <Button
            colorScheme="green"
            leftIcon={<FaPlus />}
            onClick={() => setModalAtividadeAberto(true)}
            size="sm"
          >
            Nova Atividade
          </Button>
        )}
      </Flex>

      {/* Drawer for Contract Selection */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Selecione um Contrato</DrawerHeader>
          <DrawerBody>
            <Contratos onSelectContrato={handleSelectContrato} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content Area */}
      {contratoSelecionado ? (
        <>
          <SummaryStats atividades={atividadesContrato} />

          <Box
            bg="white"
            p={0} // Removed padding to maximize space
            borderRadius="xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.200"
            minH="60vh"
          >
            {/* 
                We pass the data and setters down to avoid duplicate fetching 
                or we modify AtvContrato to accept them. 
                Based on previous file content, AtvContrato called the hook internally.
                We need to modify AtvContrato to accept these props OR use context.
                Passing props is cleaner for this refactor.
             */}
            <AtvContrato
              contratoSelecionado={contratoSelecionado}
              // Pass lifted state
              atividadesContrato={atividadesContrato}
              loadingAtividades={loadingAtividades}
              setAtividadeSelecionada={setAtividadeSelecionada}
              atividadeSelecionada={atividadeSelecionada}
              modalEditarAberto={modalEditarAberto}
              setModalEditarAberto={setModalEditarAberto}
              listarAtividadesContrato={listarAtividadesContrato} // In case it needs to refresh
            />
          </Box>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          h="60vh"
          bg="gray.50"
          borderRadius="xl"
          border="2px dashed"
          borderColor="gray.300"
          direction="column"
          gap={4}
        >
          <Icon as={FaBars} w={12} h={12} color="gray.400" />
          <Heading size="md" color="gray.500">
            Selecione um contrato para visualizar as atividades
          </Heading>
          <Button colorScheme="teal" variant="ghost" onClick={onOpen}>
            Abrir Menu de Contratos
          </Button>
        </Flex>
      )}

      <AtividadeContrato
        isOpen={modalAtividadeAberto}
        onClose={() => setModalAtividadeAberto(false)}
        contratoSelecionado={contratoSelecionado}
        onSuccess={() => listarAtividadesContrato(contratoSelecionado?.id)}
      />
    </Box>
  );
};
