import {
    Input,
    InputGroup,
    InputRightElement,
    InputProps,
  } from "@chakra-ui/react";
  import { ReactNode } from "react";
  import { SearchIcon } from "@chakra-ui/icons";
  
  interface SearchInputProps extends InputProps {
    icon?: ReactNode;
  }
  
  export function SearchInput({ icon, ...props }: SearchInputProps) {
    return (
      <InputGroup>
        <Input
          placeholder="Pesquisar..."
          focusBorderColor="#68d391"
          {...props} // inclui value, onChange, etc.
        />
        <InputRightElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          {icon || <SearchIcon color="#68d391" />}
        </InputRightElement>
      </InputGroup>
    );
  }
  