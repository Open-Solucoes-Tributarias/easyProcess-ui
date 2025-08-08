import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppRoutes } from "./routes/Routes";
import { FloatFormButton } from "./components/FloatFormButton";

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
    Input: {
      defaultProps: {
        focusBorderColor: "#68D391",
       fontSize: 10      
      },
    },
    FormLabel: {
      baseStyle: {
        fontSize: 'sm',
        marginBottom: 1
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: "#68D391",
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: "#68D391",
      },
    },
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
    Checkbox: {
      defaultProps: {
        colorScheme: 'green'
      }
    },
    Switch: {
      defaultProps: {
        colorScheme: 'green'
      }
    }
  }
});

function App() {
  return (
    <ChakraProvider theme={theme}> 
        <AppRoutes />
        <FloatFormButton formUrl='https://forms.office.com/r/uDYtkMZBxE?embed=true'/>
    </ChakraProvider>
  );
}

export default App;
