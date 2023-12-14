import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getDevicesEnergy24Hours, getDevicesEnergyMonth, getDevicesEnergyWeek, getDevicesEnergyYear, getEnergyConsumptionsOfLocations, getEnergyPerDeviceAtLocation } from "../queries/chartQueries";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { useTheme } from "@emotion/react";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

export const Chart4 = () => {
  const {user} = useSelector((state) => state.UserReducer)
  const [barData, setBarData] = useState([])
  const theme = useTheme();

  const drawChart = async () => {
    try {
      const responseData = await getEnergyConsumptionsOfLocations(user.userId);
      console.log("response data", responseData);
      setBarData(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack gap="2rem">
        <Typography textAlign="center" variant="h3" color="secondary">
          Energy Consumption by Location of User
        </Typography>

        <Stack alignItems="center" justifyItems="center">
          <Box width={200}>
            <Button variant="contained" onClick={drawChart}>
              Draw Chart
            </Button>
          </Box>
        </Stack>

        <Stack alignItems="center" justifyContent="center">
          <BarChart width={1000} height={400} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="LocationID" />
            <YAxis domain={[0, 200]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="TotalEnergy" fill={theme.palette.primary.main} />
          </BarChart>
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};
