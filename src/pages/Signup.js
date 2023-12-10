import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { CustomContainer } from "../components/CustomContainer";
import { useTheme } from "@emotion/react";
import { CustomTextField } from "../components/CustomTextField";

export const Signup = () => {
  const theme = useTheme();

  return (
    <CustomContainer>
      {/* Showcase */}
      <Stack
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          width="60%"
          p="1rem"
          sx={{
            border: `2px solid ${theme.palette.secondary.main}`,
          }}
        >
          {/* Header */}
          <Typography
            variant="h2"
            textAlign="center"
            color={theme.palette.secondary.main}
          >
            Sign Up
          </Typography>

          <Box>
            <CustomTextField inputLabel="Enter email" />
          </Box>
        </Stack>
      </Stack>
    </CustomContainer>
  );
};
