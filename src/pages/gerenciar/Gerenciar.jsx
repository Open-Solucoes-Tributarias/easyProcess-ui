'use client'
import { useState } from 'react';
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
  const [tabIndex, setTabIndex] = useState(0);

// Adicionado controle de tabIndex para evitar que o Tabs renderize todos os componentes de uma vez.
// A lógica garante que cada componente só será montado quando a aba correspondente for selecionada.

  return (
    <Tabs
      index={tabIndex}
      onChange={setTabIndex}
      variant="soft-rounded"
      colorScheme="green"
    >
      <TabList>
        <Tab>Clientes</Tab>
        <Tab>Usuários</Tab>
        <Tab>Frentes de trabalho</Tab>
        <Tab>Atividades</Tab>
        <Tab>Contratos</Tab>
      </TabList>

      <TabPanels overflow="hidden" minHeight="100vh" height="100vh">
        <TabPanel>{tabIndex === 0 && <Clientes />}</TabPanel>
        <TabPanel>{tabIndex === 1 && <Usuarios />}</TabPanel>
        <TabPanel>{tabIndex === 2 && <FrentesTrabalho />}</TabPanel>
        <TabPanel>{tabIndex === 3 && <Atividades />}</TabPanel>
        <TabPanel>{tabIndex === 4 && <Contratos />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
