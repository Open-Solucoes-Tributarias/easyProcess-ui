"use client";
import { useState } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { Clientes } from "./sections/Clientes";
import { FrentesTrabalho } from "./sections/FrentesTrabalho";
import { FloatingButton } from "../../components/FloatButton";

//gerencia estados selecionar Clientes, contratos de um cliente

export const Painel = () => {
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [contratoSelecionado, setContratoSelecionado] = useState(null);

  //recebe cliente clicado no elemento filho
  const handleSelecionarCliente = (cliente) => {
    setClienteSelecionado(cliente);
    console.log("Cliente selecionado:", cliente);
  };

  //recebe contrato selecionado vindo do filho Clientes
  const handleContratoSelecionado = (contrato) => {
    setContratoSelecionado(contrato)
    console.log('contrato selecionado', contrato);
  }

  console.log('contrato no pai state', contratoSelecionado)

  return (
    <>
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6} p={3}>
        <GridItem>
          <Text as="b" fontSize="xl">
            Contratos
          </Text>
          <Box style={styles.content}>
            <Clientes handleSelecionarCliente={handleSelecionarCliente} handleContratoSelecionado={handleContratoSelecionado} />
          </Box>
        </GridItem>
        <GridItem>
          <Text as="b" fontSize="xl">
            Atividades | Frentes de Trabalho
          </Text>
          <Box style={styles.content}>
            <FrentesTrabalho contratoSelecionado={contratoSelecionado} />
          </Box>
        </GridItem>
      </Grid>
      <FloatingButton />
    </>
  );
};

const styles = {
  content: {
    width: "100%",
    height: "80vh",
    border: "1px solid",
    borderColor: "#d0d0d0",
    borderRadius: 10,
  },
};
