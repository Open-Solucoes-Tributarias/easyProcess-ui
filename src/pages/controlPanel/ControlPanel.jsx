"use client";
import { useState } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { Clients } from "./sections/Clients";
import { FrontWorks } from "./sections/FrontWorks";
import { FloatingButton } from "../../components/FloatButton";

export const ControlPanel = () => {
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);

  const handleSelecionarEmpresa = (empresa) => {
    setEmpresaSelecionada(empresa);
    console.log("Empresa no pai:", empresa);
  };

  return (
    <>
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6} p={3}>
          <GridItem>
            <Text as="b" fontSize="xl">
              Clientes
            </Text>
            <Box style={styles.content}>
              <Clients onEmpresaSelecionada={handleSelecionarEmpresa} />
            </Box>
          </GridItem>
          <GridItem>
            <Text as="b" fontSize="xl">
              Frentes de Trabalho | Atividades
            </Text>
            <Box style={styles.content}>
              <FrontWorks />
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
