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
import { getDevicesEnergy24Hours, getDevicesEnergyMonth, getDevicesEnergyWeek, getDevicesEnergyYear, getEnergyPerDeviceAtLocation } from "../queries/chartQueries";
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

export const Chart2 = () => {
  const {user} = useSelector((state) => state.UserReducer)
  const theme = useTheme();

  const [selectedTimeFrame, setSelectedTimeFrame] = useState("24");

  const drawChart = async () => {
    try {
      let responseData;
      if (selectedTimeFrame === "24") {
        responseData = await getDevicesEnergy24Hours(user.userId);
      } else if (selectedTimeFrame === "week") {
        responseData = await getDevicesEnergyWeek(user.userId);
      } else if (selectedTimeFrame === "month") {
        responseData = await getDevicesEnergyMonth(user.userId);
      } else if (selectedTimeFrame === "year") {
        responseData = await getDevicesEnergyYear(user.userId);
      }

      console.log("response data", responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack gap="2rem">
        <Typography textAlign="center" variant="h3" color="secondary">
          Energy Consumption of enrolled devices by user
        </Typography>

        <Stack direction="row" justifyContent="center">
          <FormControl
            variant="outlined"
            sx={{ width: 200, borderColor: "#FFFFFF" }}
            color="secondary"
          >
            <InputLabel id="demo-simple-select-label">Time Frame</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTimeFrame}
              label="Time Frame"
              onChange={(e) => setSelectedTimeFrame(e.target.value)}
            >
              <MenuItem value="24">Last 24 Hours</MenuItem>
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack alignItems="flex-end" justifyItems="center">
          <Box width={200}>
            <Button variant="contained" onClick={drawChart}>
              Draw Chart
            </Button>
          </Box>
        </Stack>

        <Stack alignItems="center" justifyContent="center">
          <BarChart width={1000} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill={theme.palette.primary.main} />
          </BarChart>
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};
