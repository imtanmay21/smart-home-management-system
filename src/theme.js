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
    // Styling the Mui Button
    MuiButton: {
      styleOverrides: {
        root: {
          height: 50,
          width: "100%",
          transition: "0.2s ease-in all",

          "&:hover": {
            backgroundColor: "#537FE7",
            opacity: 0.9
          }
        },
      },
    },

    // Styling for the MUI Textfield label
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#EEEEEE",
        },
      },
    },

    // Outlined Input styling for MuiOutlinedInput
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EEEEEE",
          },
        },
      },
    },

    // Styling for the text field
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          "& fieldset": {
            borderColor: "#EEEEEE",
          },
          "& input": {
            color: "#EEEEEE",
          },
          "&::placeholder": {
            color: "#EEEEEE",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#EEEEEE",
          },
          color: "#EEEEEE",
          borderColor: "#EEEEEE"
        }
      }
    }
  },
});

export default theme;
