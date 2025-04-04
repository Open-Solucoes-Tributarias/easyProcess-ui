"use client";

import { Grid, GridItem, List, ListItem } from "@chakra-ui/react";
import { SearchInput } from "../../../components/InputSearch";

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
      <GridItem pb={4} paddingInline={5}>
        <List styleType="disc" spacing={3}>
          {clients.map((client, index) => (
            <ListItem sx={styles.listItem} key={index}>
              {client}
            </ListItem>
          ))}
        </List>
      </GridItem>
    </Grid>
  );
};

const styles = {
  listItem: {
    _hover: {
      color: "#68D391",
      cursor: "pointer",
    },
  },
};
