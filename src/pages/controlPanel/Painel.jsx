"use client";
import { useState } from "react";
import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { Contratos } from "./sections/Contratos";
import { AtvContrato } from "./sections/AtvContrato";
import { FaPlus } from "react-icons/fa";
import { AtividadeContrato } from "./components/AtividadeContrato";

export const Painel = () => {
  const [contratoSelecionado, setContratoSelecionado] = useState(null);
  const [modalAtividadeAberto, setModalAtividadeAberto] = useState(false);

  return (
    <>
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6} p={3}>
        <GridItem>
          <Text as="b" fontSize="xl">Contratos</Text>
          <Box style={styles.content}>
            <Contratos onSelectContrato={setContratoSelecionado} />
          </Box>
        </GridItem>

        <GridItem>
          <Text as="b" fontSize="xl">Atividades | Frentes de Trabalho</Text>
          {contratoSelecionado && (
            <Button
              variant="text"
              color="#68D391"
              leftIcon={<FaPlus />}
              onClick={() => setModalAtividadeAberto(true)}
            >
              Adicionar
            </Button>
          )}
          <Box style={styles.content}>
            <AtvContrato contratoSelecionado={contratoSelecionado} />
          </Box>
        </GridItem>
      </Grid>

      <AtividadeContrato
        isOpen={modalAtividadeAberto}
        onClose={() => setModalAtividadeAberto(false)}
        contratoSelecionado={contratoSelecionado}
      />
    </>
  );
};

const styles = {
  content: {
    width: "100%",
    height: "80vh",
    overflowY: "auto",
    border: "1px solid",
    borderColor: "#d0d0d0",
    borderRadius: 10,
  },
};
