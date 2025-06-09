"use client";
import { useState } from "react";
import { Box, Button, Grid, GridItem, Input, Stack, Text } from "@chakra-ui/react";
import { Clientes } from "./sections/Clientes";
import { FrentesTrabalho } from "./sections/FrentesTrabalho";
import { FloatButton } from "../../components/FloatButton";
import { FaClipboardList, FaPaperclip, FaPlus, FaUser } from "react-icons/fa";

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
          <Button variant='text' color='#68D391' leftIcon={<FaPlus />}>
            Adicionar
          </Button>
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
      <FloatButton // compoente di botão suspenso que recebe Fomrularios e states dos respectivos modais de adição.
        actions={[
          {
            label: "Adicionar contrato",
            icon: <FaUser />,
            modalTitle: "Adicionar contratos",
            modalBody: (
              <Stack spacing={3}>
                <Input placeholder="Nome do cliente" />
                <Input placeholder="Email" />
              </Stack>
            ),
            onSave: () => { },
          },
          {
            label: "Adicionar atividades",
            icon: <FaPaperclip />,
            modalTitle: "Adicionar Atividades",
            modalBody: (
              <Stack spacing={3}>
                <Input placeholder="Número do FT" />
                <Input placeholder="Descrição" />
              </Stack>
            ),
            onSave: () => { },
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
    border: "1px solid",
    borderColor: "#d0d0d0",
    borderRadius: 10,
  },
};
