import { createTheme } from "@mui/material";

const theme = createTheme({
  // Palette color
  palette: {
    primary: {
      main: "#537FE7",
      dark: "#181823",
    },
    secondary: {
      main: "#EEEEEE",
    },
  },

  // Typography
  typography: {
    fontFamily: "Roboto",
  },

  components: {

    // Styling for the MUI Textfield label
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&': {
            color: "#EEEEEE"
          }
        }
      }
    },

    // Outlined Input styling for MuiOutlinedInput
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EEEEEE"
          }
        }
      }
    },

    // Styling for the text field
    MuiTextField: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: "#EEEEEE",
          },
          '& input': {
            color: "#EEEEEE"
          },
          '&::placeholder': {
            color: "#EEEEEE"
          }
        }
      }
    },
  },
});

export default theme;
