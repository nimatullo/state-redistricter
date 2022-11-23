import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      main: "#111825",
      white: "#F0F4F9",
      secondary: "#767c85",
      tertiary: "#E63F4E",
    },
  },
  fonts: {
    body: `"Helvetica Neue", Helvetica, sans-serif`,
    heading: `"Helvetica Neue", Helvetica, sans-serif`,
  },
});

export default theme;
