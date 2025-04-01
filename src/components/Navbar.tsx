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
  useDisclosure,
  useColorModeValue,
  Stack,
  GenericAvatarIcon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChatIcon } from "@chakra-ui/icons";

interface NavbarProps {
  children: ReactNode;
}

const Links = ["Dashboard", "Frentes de Trabalho", "Atividades"];

const NavLink = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export const Navbar = ({ children }: NavbarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={6} py={1}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* ESQUERDA: Menu e logo */}
          <HStack spacing={4} alignItems="center">
            <IconButton
              size={"md"}
              border={"1px solid #666666"}
              icon={
                isOpen ? (
                  <CloseIcon color={"gray.900"} />
                ) : (
                  <HamburgerIcon color={"gray.900"} />
                )
              }
              aria-label={"Open Menu"}
              onClick={isOpen ? onClose : onOpen}
            />
            <img src="/logoEp.svg" alt="Logo" height="32" />
          </HStack>

          {/* DIREITA: Ícones e Avatar */}
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
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* MOBILE: Links colapsados */}
        {isOpen && (
          <Box pb={4}>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Conteúdo da página */}
      <Box p={4}>{children}</Box>
    </>
  );
};
