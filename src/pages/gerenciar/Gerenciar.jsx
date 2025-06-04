'use client'
import {
    Flex,
    Button,
    Grid,
    GridItem,
    Text,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels
} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa';
import { Informativo } from '../../components/Informativo';
import { Clientes } from './secoes/Clientes';
import { Perfil } from './secoes/Perfil';

export const Gerenciar = () => {

    return (
        <Tabs variant='enclosed' verflow='hidden' minHeight='100vh' height='100vh'>
            <TabList colorScheme='green'>
                <Tab>Clientes</Tab>
                <Tab>Usuários</Tab>
            </TabList>
            <TabPanels overflow='hidden' minHeight='100vh' height='100vh'>
                <TabPanel>
                    <Clientes/>
                </TabPanel>
                <TabPanel>
                    <Perfil />
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