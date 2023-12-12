import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { CustomContainer } from "../components/CustomContainer";
import { signUp } from "../queries/userQueries";

const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Signup = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

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
    const isPasswordValid = password.length > 8;

    // Confirm password field
    const isConfirmPasswordValid = password === confirmPassword;

    if (!isEmailValid) {
      setEmailError("Invalid Email Format");
    }

    if (!isPasswordValid) {
      setPasswordError("Password should be greater than 8 characters");
    }

    if (!isConfirmPasswordValid) {
      setConfirmPasswordError("Passwords do not match");
    }

    return isEmailValid && isPasswordValid && isConfirmPasswordValid;
  };

  // Handle Sign up in the form
  const signUpUser = async (e) => {
    // Prevent default behaviour for sign up form
    e.preventDefault();

    // Set errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate input fields
    if (validateInputFields()) {
      await signUp(email, password, dispatch);
    }
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
              error={emailError !== ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              variant="outlined"
              label="Password"
              color="secondary"
              type="password"
              error={passwordError !== ""}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              variant="outlined"
              label="Confirm Password"
              color="secondary"
              type="password"
              error={confirmPasswordError !== ""}
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
