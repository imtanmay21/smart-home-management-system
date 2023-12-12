import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import React, { useState } from "react";

import { CustomContainer } from "../components/CustomContainer";

export const Signup = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle Sign up in the form
  const signUpUser = (e) => {
    // Prevent default behaviour for sign up form
    e.preventDefault();

    console.log("email", email);
    console.log("password", password);
    console.log("confirm password", confirmPassword);
  };

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
          width="400px"
          p="2rem"
          gap="1rem"
          sx={{
            border: `2px solid ${theme.palette.secondary.main}`,
          }}
          component="form"
          onSubmit={signUpUser}
        >
          {/* Header */}
          <Box>
            <Typography
              variant="h2"
              textAlign="center"
              color={theme.palette.secondary.main}
            >
              Sign Up
            </Typography>
          </Box>

          <Box>
            <TextField
              variant="outlined"
              label="Email"
              color="secondary"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              variant="outlined"
              label="Password"
              color="secondary"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              variant="outlined"
              label="Confirm Password"
              color="secondary"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>

          <Box>
            <Button variant="contained" onClick={signUpUser}>
              Sign Up
            </Button>
          </Box>

          <Box>
            <Typography color="secondary" textAlign="center">
              Already have an account?{" "}
              <Link href="/login" color="primary" sx={{ cursor: "pointer" }}>
                Log in
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </CustomContainer>
  );
};