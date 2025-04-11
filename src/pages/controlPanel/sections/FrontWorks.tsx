"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CheckCircleIcon, InfoOutlineIcon, MinusIcon, SearchIcon } from "@chakra-ui/icons";
import { FaEdit } from "react-icons/fa";

// Mock de dados de frentes e atividades
const mockFrentes = [
  {
    nome: "Recuperação na área de Saúde",
    atividades: [
      {
        nome: "Cadastrar o tomador como procurador no e-Cac",
        concluida: true,
        responsavel: "João Silva",
      },
      {
        nome: "Baixar ECF",
        concluida: false,
        responsavel: "Maria Costa",
      },
    ],
  },
  {
    nome: "Consultoria Municipal",
    atividades: [],
  },
  {
    nome: "Recuperação Tributária",
    atividades: [],
  },
];

export const FrontWorks = () => {
  return (
    <Grid templateColumns="1fr" gap={6} p={4}>
      <GridItem>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Pesquisar" />
        </InputGroup>
      </GridItem>

      <GridItem>
        <Accordion allowMultiple defaultIndex={[0]}>
          {mockFrentes.map((frente, i) => (
            <AccordionItem key={i} border="none">
              <h2>
                <AccordionButton px={0} _hover={{ bg: "transparent" }}>
                <AccordionIcon />
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    {frente.nome}
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel px={0} pt={2}>
                {frente.atividades.length > 0 ? (
                  <VStack align="stretch" spacing={3}>
                    {frente.atividades.map((atividade, j) => (
                      <Flex
                        key={j}
                        justify="space-between"
                        align="center"
                        borderLeft="2px solid"
                        borderColor={atividade.concluida ? "green.400" : "gray.400"}
                        pl={2}
                      >
                        <Flex align="center" gap={2}>
                          <Icon
                            as={atividade.concluida ? CheckCircleIcon : MinusIcon}
                            color={atividade.concluida ? "green.400" : "gray.400"}
                            boxSize={4}
                          />
                          <Text fontSize="sm">{atividade.nome}</Text>
                        </Flex>
                        <Flex gap={2}>
                          <IconButton
                            aria-label="Editar"
                            icon={<FaEdit />}
                            variant="ghost"
                            size="sm"
                          />
                          <IconButton
                            aria-label="Info"
                            icon={<InfoOutlineIcon />}
                            variant="ghost"
                            size="sm"
                          />
                          <Avatar name={atividade.responsavel} size="sm" />
                        </Flex>
                      </Flex>
                    ))}
                  </VStack>
                ) : (
                  <Text fontSize="sm" color="gray.500">
                    Nenhuma atividade cadastrada.
                  </Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </GridItem>
    </Grid>
  );
};
