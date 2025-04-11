"use client";
import { Navbar } from "../../components/Navbar";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { Clients } from "./sections/Clients";
import { FrontWorks } from "./sections/FrontWorks";

export const ControlPanel = () => {
  return (
    <>
      <Navbar>
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6} p={3}>
          <GridItem>
            <Text as="b" fontSize="xl">
              Clientes
            </Text>
            <Box style={styles.content}>
              <Clients />
            </Box>
          </GridItem>
          <GridItem>
            <Text as="b" fontSize="xl">
              Frentes de Trabalho | Atividades
            </Text>
            <Box style={styles.content}>
              <FrontWorks/>
            </Box>
          </GridItem>
        </Grid>
      </Navbar>
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
