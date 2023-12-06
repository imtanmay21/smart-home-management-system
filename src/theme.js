import { createTheme } from "@mui/material";

const theme = createTheme({
  // Palette color
  palette: {
    primary: {
      main: "#537FE7",
    },
    secondary: {
      main: "#EEEEEE",
      dark: "#181823"
    },
  },

  // Typography
  typography: {
    fontFamily: "Roboto",
  },
});

export default theme;
