"use client";
import { SearchIcon } from "@chakra-ui/icons";
import { Navbar } from "../../components/Navbar";
import {
  Box,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

export const ControlPanel = () => {
  return (
    <>
      <Navbar>
        <Grid templateColumns="1fr 2fr" gap={6} p={3}>
          <GridItem>
            <Text as="b" fontSize="xl">
              Clientes
            </Text>
            <Box style={styles.content}>
              <InputGroup>
                <Input placeholder="Pesquisar..." focusBorderColor="#68d391" />
                <InputRightElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                >
                  <SearchIcon color="#68d391" />
                </InputRightElement>
              </InputGroup>
            </Box>
          </GridItem>
          <GridItem>
            <Text as="b" fontSize="xl">
              Frentes de Trabalho | Atividades
            </Text>
            <Box style={styles.content}></Box>
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
