import { Box, useTheme } from "@mui/material";
import React from "react";

export const CustomContainer = ({ children }) => {
  const theme = useTheme();

  // Access theme properties
  console.log("theme,", theme)

  return (
    <Box
      height="100vh"
      width="100vw"
      
    >
      <Box height="100%" width="80%">
        {children}
      </Box>
    </Box>
  );
};
