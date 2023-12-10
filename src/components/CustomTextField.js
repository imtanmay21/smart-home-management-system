import { TextField } from "@mui/material";
import React from "react";

export const CustomTextField = ({ inputLabel }) => {
  return (
    <TextField
      variant="outlined"
      label={inputLabel}
      color="secondary"
      sx={{
        width: "100%",
      }}
    />
  );
};
