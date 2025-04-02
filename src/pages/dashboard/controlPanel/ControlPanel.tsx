'use client'
import { Navbar } from "../../../components/Navbar";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export const ControlPanel = () => {

    return (
        <>
            <Navbar>
                <Grid templateColumns="1fr 2fr" gap={6} p={3}>
                    <GridItem>
                        <Box w='100%' h='10' border={"1px solid"} borderColor={"#d0d0d0"} borderRadius={10} height={"80vh"}>
                            <p>clientes</p>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box w='100%' h='10' border={"1px solid"} borderColor={"#d0d0d0"} borderRadius={10} height={"80vh"}>
                            <p>FT / Atividades</p>
                        </Box>
                    </GridItem>
                </Grid>
            </Navbar>
        </>
    );
};