import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import React, { useState } from "react";

import { CustomContainer } from "../components/CustomContainer";
import { login } from "../queries/userQueries";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [userAuthError, setUserAuthError] = useState("");

  // Validate input fields
  const validateFields = () => {
    // Validate email field
    const isEmailValid = email.toLowerCase().match(validEmailRegex);

    if (!isEmailValid) {
      setEmailError("Invalid Email Format");
    }

    return isEmailValid;
  };

  // Handle Sign up in the form
  const loginUser = async (e) => {
    // Prevent default behaviour for sign up form
    e.preventDefault();

    setEmailError("");
    setUserAuthError("")

    // Validate form fields
    if (validateFields()) {
      try {
        await login(email, password);
        navigation("/")
      } catch (error) {
        setUserAuthError(error.message);
      }
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
          onSubmit={loginUser}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body1" color="error" textAlign="center">
              {userAuthError}
            </Typography>
          </Box>

          <Box>
            <Button variant="contained" onClick={loginUser}>
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
