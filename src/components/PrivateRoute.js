import React from "react";

import { auth } from "../config/firebaseConfig";
import { Navigate, Route } from "react-router";

// Check if user is authenticated or not
const isAuthenticated = () => {
  // Check if user is authenticated
  if (auth.currentUser) {
    return true
  } else {
    return false
  }
};

export const PrivateRoute = ({ element, ...props }) => {
  return isAuthenticated() ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};
