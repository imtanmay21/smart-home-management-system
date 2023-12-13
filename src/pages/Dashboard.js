import React from "react";

import { CustomContainer } from "../components/CustomContainer";
import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import { CustomDrawer } from "../components/CustomDrawer";

export const Dashboard = () => {
  const theme = useTheme();

  const MainComponent = (
    <Stack>
      <Typography>Dashboard  </Typography>
    </Stack>
  )

  
  return (
    <Stack bgcolor={theme.palette.primary.dark} sx={{height: "100vh", width: "100vw"}}>
      <CustomDrawer mainComponent={MainComponent} />
    </Stack>
  )
};
