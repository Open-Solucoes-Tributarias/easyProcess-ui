"use client";
import { useState } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { Clientes } from "./sections/Clientes";
import { FrentesTrabalho } from "./sections/FrentesTrabalho";
import { FloatingButton } from "../../components/FloatButton";

export const Painel = () => {
  const [clienteSelecionada, setClienteSelecionada] = useState(null);

  const handleSelecionarCliente = (cliente) => {
    setClienteSelecionada(cliente);
    console.log("Cliente no pai:", cliente);
  };

  return (
    <>
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6} p={3}>
          <GridItem>
            <Text as="b" fontSize="xl">
              Clientes
            </Text>
            <Box style={styles.content}>
              <Clientes onClienteSelecionada={handleSelecionarCliente} />
            </Box>
          </GridItem>
          <GridItem>
            <Text as="b" fontSize="xl">
              Frentes de Trabalho | Atividades
            </Text>
            <Box style={styles.content}>
              <FrentesTrabalho />
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
