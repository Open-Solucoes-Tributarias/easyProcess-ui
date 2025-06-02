import {
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export function SearchInput({ icon, ...props }) {
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
