import { useTheme } from "@emotion/react";
import { AccountCircle } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export const Profile = () => {
  const theme = useTheme();

  const profileData = [
    {
      label: "First Name",
      value: "Tanmay",
    },
    {
      label: "Last Name",
      value: "Mandal",
    },
    {
      label: "Billing Address",
      value: "4802 4th Avenue 3R",
    },
  ];

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      p="2rem 0"
      sx={{ border: `1px solid ${theme.palette.secondary.main}` }}
    >
      <Box>
        <Typography color="secondary" variant="h2">
          PROFILE
        </Typography>
      </Box>

      <Stack direction="row" alignItems="center" width="100%">
        <Stack flex={1} alignItems="center" justifyContent="center">
          <AccountCircle
            color="secondary"
            sx={{ height: "60%", width: "60%" }}
          />
        </Stack>

        <Stack flex={1} gap="2rem">
          {profileData.map((data, index) => (
            <Stack
              key={index}
              direction="row"
              width="80%"
              alignItems="center"
              borderBottom="1px solid #444444"
            >
              <Box
                flex={0.6}
                p="1rem"
                marginBottom="1rem"
                sx={{ borderRight: "1px solid #444444" }}
              >
                <Typography
                  variant="h6"
                  color="secondary"
                  sx={{ opacity: 0.7 }}
                >
                  {data.label}
                </Typography>
              </Box>
              <Box flex={1} marginBottom="1rem" p="1rem">
                <Typography variant="h6" color="secondary">
                  {data.value}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
