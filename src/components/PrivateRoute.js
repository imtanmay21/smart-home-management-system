import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

import { auth } from "../config/firebaseConfig";
import { CircularProgress, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

export const PrivateRoute = ({ redirectTo = "/login", children }) => {
  const theme = useTheme();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Stack
        bgcolor={theme.palette.primary.dark}
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh", width: "100vw" }}
      >
        <CircularProgress color="primary" />
      </Stack>
    );
  }

  if (user) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to={redirectTo} />;
  }
};
