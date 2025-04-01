import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppRoutes } from "./routes/routes";

const theme = extendTheme({
  colors: {
    brand: {
      500: "#1A365D",
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
