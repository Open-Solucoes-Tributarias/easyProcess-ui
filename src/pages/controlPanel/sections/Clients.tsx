"use client";

import {
  Grid,
  GridItem,
  List,
  ListItem,
  ListIcon,
  Text,
} from "@chakra-ui/react";
import { SearchInput } from "../../../components/InputSearch";
import { CheckCircleIcon } from "@chakra-ui/icons";

const clients = [
  "TechPlus Solutions",
  "Alpha Contabilidade",
  "Green Agro",
  "Nova Saúde",
  "LogiTrans",
];

export const Clients = () => {
  return (
    <Grid templateColumns="1fr" gap={6} p={3}>
      <GridItem>
        <SearchInput />
      </GridItem>
      <GridItem pb={4} paddingInline={4}>
        <List spacing={3}>
          {clients.map((client, index) => (
            <ListItem key={index}>
              {/* <ListIcon as={CheckCircleIcon} color="green.500" /> */}
              {client}
            </ListItem>
          ))}
        </List>
      </GridItem>
    </Grid>
  );
};

const styles = {};
