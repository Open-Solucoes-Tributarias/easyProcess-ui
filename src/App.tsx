import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppRoutes } from "./routes/Routes";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      500: "#1A365D",
    },
  },
  styles: {
    global: () => ({
      "html, body": {
        color: "#4c4c4c",
        lineHeight: "tall",
        bg: "white",
      },
      a: {
        color: "teal.500",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
      },
      variants: {
        solid: {
          bg: "#68D391",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
        outline: {
          bg: "#EDF2F7",
          color: "#7a7a7a",
          fontWeight: 600,
          _hover: {
            bg: "brand.600",
          },
        },
      },
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
