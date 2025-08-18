import { Box, Text, HStack } from "@chakra-ui/react";
import { Select as ChakraReactSelect } from "chakra-react-select";

export default function ContratoSelect({
  contratos,
  contratoSelecionado,
  setContratoSelecionado,
}) {
  return (
    <ChakraReactSelect
      isSearchable
      isClearable
      placeholder="Selecione um contrato..."
      options={contratos.map((c) => ({
        label: c.descricao,
        value: c.id,
        data: c, // guardamos o objeto inteiro
      }))}
      value={
        contratoSelecionado
          ? {
              label: contratoSelecionado.descricao,
              value: contratoSelecionado.id,
              data: contratoSelecionado,
            }
          : null
      }
      onChange={(opt) => setContratoSelecionado(opt?.data || null)}
      formatOptionLabel={(option) => {
        const c = option.data;
        return (
          <Box>
            <Text fontWeight="bold">{c.descricao}</Text>
            <HStack spacing={2} fontSize="sm" color="gray.500">
              <Text>Supervisor: {c.nomeSupervisor ?? "—"}</Text>
              <Text>•</Text>
              <Text>
                Vigência:{" "}
                {new Date(c.dataInicio).toLocaleDateString("pt-BR")} →{" "}
                {new Date(c.dataFim).toLocaleDateString("pt-BR")}
              </Text>
            </HStack>
          </Box>
        );
      }}
      // bg da opção selecionada e foco/hover
      chakraStyles={{
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? "#68d3915d" // bg quando a opção está selecionada
            : state.isFocused
            ? "blue.50" // bg quando está em foco/hover
            : "white", // bg normal
          color: state.isSelected ? "inherit" : "inherit",
          cursor: "pointer",
        }),
        // (opcional) deixar o controle mais "alto"
        control: (provided) => ({
          ...provided,
          minH: "44px",
        }),
        // (opcional) ajustar a opção quando desabilitada      
      }}
      noOptionsMessage={() => "Nenhum contrato encontrado"}
    />
  );
}
