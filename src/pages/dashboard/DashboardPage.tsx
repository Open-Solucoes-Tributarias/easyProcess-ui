'use client'
import { Navbar } from "../../components/Navbar";
import { ReactNode } from "react";
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { TriangleUpIcon } from "@chakra-ui/icons";

interface StatsCardProps {
  title: string
  stat: string
  icon: ReactNode
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={'#4c4c4c'}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={"#4c4c4c"}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}


export const DashboardPage = () => {
  
  return (
    <>
      <Navbar>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
        Suas estatisticas atuais
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Clientes'} stat={'5'} icon={<TriangleUpIcon boxSize="15px" />} />
        <StatsCard title={'Frentes de Trabalho'} stat={'8'} icon={<TriangleUpIcon boxSize="15px" />} />
        <StatsCard title={'Atividades'} stat={'7'} icon={<TriangleUpIcon boxSize="15px" />} />
      </SimpleGrid>
    </Box>
      </Navbar>
    </>
  );
};