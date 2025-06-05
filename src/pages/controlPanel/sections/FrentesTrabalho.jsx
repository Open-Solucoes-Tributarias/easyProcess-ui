"use client";
import { useState, useEffect } from "react";
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
  Text,
  VStack,
} from "@chakra-ui/react";
import { SearchInput } from "../../../components/InputSearch";
import { getAtividadesContrato } from "../../../services/atividadesContrato";


export const FrentesTrabalho = ({ handleContratoSelecionado }) => {
  const [atvContrato, setAtvContrato] = useState([]);

  //funcao buscar dados dos clientes
  // const listarAtvContrato = async () => {
  //   try {
  //     const dadosAtvContrato = await getAtividadesContrato(onContratoSelecionado);
  //     console.log("atividades do contrato selecionado");
  //     setAtvContrato(dadosAtvContrato);

  //   } catch (error) {
  //     console.error("não foi possivel buscar atividades do contrato")
  //   }
  // };

  // useEffect(() => {
  //   listarAtvContrato();
  // }, []);

  // const handleContrato = (contrato) => {
  //   onContratoSelecionado(contrato);
  //   // listarContratos(cliente?.id);
  // };

  return (
    <Grid templateColumns="1fr" gap={6} p={4}>
      <GridItem>
        <SearchInput />
      </GridItem>
      {/* lista de atividades do contrato */}
      <GridItem>

      </GridItem>
    </Grid>
  );
};
