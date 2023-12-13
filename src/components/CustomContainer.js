import { Box, Stack, useTheme } from "@mui/material";
import React from "react";

export const CustomContainer = ({ children }) => {
  const theme = useTheme();

  return (
    <Stack
      height="100vh"
      width="100vw"
      p="2rem 0"
      bgcolor={theme.palette.primary.dark}
      alignItems="center"
      justifyContent="center"
      overflow="auto"
    >
      <Box height="100%" width="80%">
        {children}
      </Box>
    </Stack>
  );
};
