import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { CustomContainer } from "../components/CustomContainer";

export const Signup = () => {
  return (
    <CustomContainer>
      <Stack direction="row">
        <Box flex="0.6"></Box>

        <Box flex="0.4">
          {/* Sign up form */}
          <Stack alignItems="center" justifyContent="center">
            {/* Header */}
            <Typography variant="h2">Sign Up</Typography>

            {/* Form for signup */}
            <Stack>
              <Box>
                <TextField label="Enter email" />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </CustomContainer>
  );
};
