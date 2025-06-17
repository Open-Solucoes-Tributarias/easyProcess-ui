"use client";
import { useState } from "react";
import { Box, Grid, GridItem, Input, Stack, Text } from "@chakra-ui/react";
import { Contratos } from "./sections/Contratos";
import { AtvContrato } from "./sections/AtvContrato";
import { FloatButton } from "../../components/FloatButton";
import { FaPlus } from "react-icons/fa";
import { AtividadeContrato } from "./components/AtividadeContrato";

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
            <Contratos handleSelecionarCliente={handleSelecionarCliente} handleContratoSelecionado={handleContratoSelecionado} />
          </Box>
        </GridItem>
        <GridItem>
          <Text as="b" fontSize="xl">
            Atividades | Frentes de Trabalho
          </Text>
          <Box style={styles.content}>
            <AtvContrato contratoSelecionado={contratoSelecionado} />
          </Box>
        </GridItem>
      </Grid>
      <FloatButton
        actions={[
          {
            label: 'Nova Atividade',
            icon: <FaPlus />,
            component: ({ onClose }) => (
              <AtividadeContrato isOpen={true} onClose={onClose} />
            ),
          },
        ]}
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
