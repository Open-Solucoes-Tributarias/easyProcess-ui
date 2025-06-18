import {
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

export function SearchInput({
  data = [],
  filterBy,               // campo a ser filtrado, opcional
  onFilter = () => {},    // função callback com o resultado
  icon,
  delay = 300,            // debounce opcional
  ...inputProps           // props como value, onChange, placeholder
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const lower = query.toLowerCase();

      const result = data.filter((item) => {
        const value = filterBy ? item[filterBy] : item;
        return typeof value === "string" && value.toLowerCase().includes(lower);
      });

      onFilter(result);
    }, delay);

    return () => clearTimeout(timeout);
  }, [query, data, filterBy, onFilter, delay]);

  return (
    <InputGroup>
      <Input
        placeholder="Pesquisar..."
        focusBorderColor="#68d391"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        {...inputProps}
      />
      <InputRightElement pointerEvents="none" color="gray.300" fontSize="1.2em">
        {icon || <SearchIcon color="#68d391" />}
      </InputRightElement>
    </InputGroup>
  );
}
