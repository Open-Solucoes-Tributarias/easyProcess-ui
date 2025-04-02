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
      'html, body': {
        color: '#4c4c4c',
        lineHeight: 'tall',
        bg: 'white',
      },
      a: {
        color: 'teal.500',
      },
    }),
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
