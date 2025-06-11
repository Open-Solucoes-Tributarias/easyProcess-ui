'use client'
import {
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels
} from '@chakra-ui/react'
import { Clientes } from './secoes/Clientes';
import { Usuarios } from './secoes/Usuarios';
import { FrentesTrabalho } from './secoes/Frentes';
import { Atividades } from './secoes/Atividades';
import { Contratos } from './secoes/Contratos';

export const Gerenciar = () => {

    return (
        <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList>
                <Tab>Clientes</Tab>
                <Tab>Usuários</Tab>
                <Tab>Frentes de trabalho</Tab>
                <Tab>Atividades</Tab>
                <Tab>Contratos</Tab>
            </TabList>
            <TabPanels overflow='hidden' minHeight='100vh' height='100vh'>
                <TabPanel>
                    <Clientes />
                </TabPanel>
                <TabPanel>
                    <Usuarios />
                </TabPanel>
                <TabPanel>
                    <FrentesTrabalho />
                </TabPanel>
                <TabPanel>
                    <Atividades />
                </TabPanel>
                <TabPanel>
                    <Contratos />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

const styles = {
    content: {
        width: "100%",
        height: "100vh",
        overflowY: "auto",
        border: "1px solid",
        borderColor: "#d0d0d0",
        borderRadius: 10,
        paddingInline: 30,
        paddingBlock: 30,
    },

};