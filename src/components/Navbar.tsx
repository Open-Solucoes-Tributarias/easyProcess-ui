"use client";
import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  GenericAvatarIcon,
} from "@chakra-ui/react";
import { HamburgerIcon, ChatIcon } from "@chakra-ui/icons";

interface NavbarProps {
  children: ReactNode;
}

const Links = ["Dashboard", "Frentes de Trabalho", "Atividades"];

export const Navbar = ({ children }: NavbarProps) => {
  return (
    <>
      <Box bg={"#fff"} px={6} py={1}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={4} alignItems="center">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Abrir menu"
                icon={<HamburgerIcon color={"gray.900"} />}
                variant="outline"
                borderColor="#d0d0d0"
              />
              <MenuList>
                {Links.map((link) => (
                  <MenuItem key={link}>{link}</MenuItem>
                ))}
              </MenuList>
            </Menu>
            <img src="/logoEp.svg" alt="Logo" height="32" />
          </HStack>
          <Flex alignItems={"center"}>
            <ChatIcon mr={4} />
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} icon={<GenericAvatarIcon />} />
              </MenuButton>
              <MenuList>
                <MenuItem>Perfil</MenuItem>
                <MenuItem>Configurações</MenuItem>
                <MenuDivider />
                <MenuItem>Sair</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <hr color="#d0d0d0" />
      {/* Conteúdo da página */}
      <Box p={4}>{children}</Box>
    </>
  );
};
