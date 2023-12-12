import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import React, { useState } from "react";

import { CustomContainer } from "../components/CustomContainer";

const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Login = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Form Validation
  const validateInputFields = () => {
    // Validate email field
    const isEmailValid = email.toLowerCase().match(validEmailRegex);

    // Validate password field
    const isPasswordValid = password.length > 8

    // Confirm password field
    const isConfirmPasswordValid = password === confirmPassword

    if (isEmailValid) {
      setEmailError("Invalid Email Format")
    }

    if (isPasswordValid) {
      setPasswordError("Password should be greater than 8 characters")
    }

    if (isConfirmPasswordValid) {
      setConfirmPasswordError("Passwords do not match")
    }

  };

  // Handle Sign up in the form
  const signUpUser = (e) => {
    // Prevent default behaviour for sign up form
    e.preventDefault();

    // Validate form fields
    validateInputFields()
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
              Log in
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
            <Button variant="contained" onClick={signUpUser}>
              Log in
            </Button>
          </Box>

          <Box>
            <Typography color="secondary" textAlign="center">
              Don't have an account?{" "}
              <Link href="/signup" color="primary" sx={{ cursor: "pointer" }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </CustomContainer>
  );
};
