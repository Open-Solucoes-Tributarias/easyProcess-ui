"use client";
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
import { useNavigate } from "react-router-dom";
import { HamburgerIcon, ChatIcon } from "@chakra-ui/icons";

const Links = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Painel de controle", path: "/painel" },
  { label: "Gerenciar clientes", path: "/clientes" },
];

export const Navbar = ({ children }) => {
  const navigate = useNavigate();

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
                  <MenuItem key={link.label} onClick={() => navigate(link.path)}>
                    {link.label}
                  </MenuItem>
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
                <MenuItem onClick={() => navigate("/perfil")}>Perfil</MenuItem>
                <MenuItem onClick={() => navigate("/")}>Configurações</MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                >
                  Sair
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <hr color="#d0d0d0" />
      <Box p={4}>{children}</Box>
    </>
  );
};
