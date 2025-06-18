"use client";
import { useState } from "react";
import { Box, Button, Grid, GridItem, Input, Stack, Text } from "@chakra-ui/react";
import { Contratos } from "./sections/Contratos";
import { AtvContrato } from "./sections/AtvContrato";
import { FaPlus } from "react-icons/fa";
import { AtividadeContrato } from "./components/AtividadeContrato";

//gerencia estados selecionar Clientes, contratos de um cliente

export const Painel = () => {
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [contratoSelecionado, setContratoSelecionado] = useState(null);

  //state de atvidade contrato
  const [modalAtividadeAberto, setModalAtividadeAberto] = useState(false);


  //recebe cliente clicado no elemento filho
  const handleSelecionarCliente = (cliente) => {
    setClienteSelecionado(cliente);
  };

  //recebe contrato selecionado vindo do filho Clientes
  const handleContratoSelecionado = (contrato) => {
    setContratoSelecionado(contrato)
  }

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
          <Button
            variant="text"
            color="#68D391"
            leftIcon={<FaPlus />}
            onClick={() => {setModalAtividadeAberto(true)}}
          >
            Adicionar
          </Button>
          <Box style={styles.content}>
            <AtvContrato contratoSelecionado={contratoSelecionado} />
          </Box>
        </GridItem>
      </Grid>

      {/* modal de atividade de um contrato */}

      <AtividadeContrato 
        isOpen={modalAtividadeAberto}
        onClose={() => setModalAtividadeAberto(false)}
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
