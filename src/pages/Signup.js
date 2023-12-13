import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { CustomContainer } from "../components/CustomContainer";
import { signUp } from "../queries/userQueries";

const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Signup = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userAuthError, setUserAuthError] = useState("");

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

    // Check if input fields is valid
    if (!isEmailValid) {
      setEmailError("Invalid Email Format");
    }

    if (!isPasswordValid) {
      setPasswordError("Password should be greater than 8 characters");
    }

    if (!isConfirmPasswordValid) {
      setConfirmPasswordError("Passwords do not match");
    }

    return (
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      firstName !== "" &&
      lastName !== "" &&
      billingAddress !== ""
    );
  };

  // Handle Sign up in the form
  const signUpUser = async (e) => {
    // Prevent default behaviour for sign up form
    e.preventDefault();

    // Set errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setUserAuthError("");

    // Validate input fields
    if (validateInputFields()) {
      try {
        // Signup user
        await signUp(email, password, firstName, lastName, billingAddress, dispatch);

        // Navigate to dashboard
        navigation("/");
      } catch (error) {
        // Setup user auth error
        setUserAuthError(error.message);
      }
    }
  };

  // Navigate the user to go to dashboard
  useEffect(() => {}, []);

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
              label="First Name"
              color="secondary"
              error={firstName === ""}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              variant="outlined"
              label="Last Name"
              color="secondary"
              error={lastName === ""}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              variant="outlined"
              label="Billing Address"
              color="secondary"
              error={billingAddress === ""}
              onChange={(e) => setBillingAddress(e.target.value)}
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
            <Typography variant="body1" color="error" textAlign="center">
              {userAuthError}
            </Typography>
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
