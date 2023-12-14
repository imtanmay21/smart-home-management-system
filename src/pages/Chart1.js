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
import { getEnergyPerDeviceAtLocation } from "../queries/chartQueries";
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

export const Chart1 = () => {
  const { locations } = useSelector((state) => state.LocationReducer);
  const theme = useTheme();

  const [barData, setBarData] = useState([]);
  const [selectedLocationID, setSelectedLocationID] = useState(
    locations.length > 0 ? locations[0].LocationID : null
  );
  const [startDate, setStartDate] = useState(
    dayjs(moment().format("YYYY-MM-DD"))
  );
  const [endDate, setEndDate] = useState(dayjs(moment().format("YYYY-MM-DD")));

  const drawChart = async () => {
    try {
      const responseData = await getEnergyPerDeviceAtLocation(
        selectedLocationID,
        moment(startDate.format("YYYY-MM-DD")),
        moment(endDate.format("YYYY-MM-DD"))
      );

      const filteredData = responseData.map((data) => ({
        deviceLabel: `${data.Type}-${data.DeviceID}`,
        TotalEnergy: data.TotalEnergy,
      }));
      setBarData(filteredData);

      console.log("response data", responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack gap="2rem">
        <Typography textAlign="center" variant="h3" color="secondary">
          Energy Consumption per device at a location
        </Typography>

        {locations.length > 0 && <Stack direction="row" justifyContent="space-between">
          <FormControl
            variant="outlined"
            sx={{ width: 200, borderColor: "#FFFFFF" }}
            color="secondary"
          >
            <InputLabel id="demo-simple-select-label">Location Id</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedLocationID}
              label="Location Id"
              onChange={(e) => setSelectedLocationID(e.target.value)}
            >
              {locations.map((location) => (
                <MenuItem key={location.locationID} value={location.LocationID}>
                  {location.LocationID}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DatePicker
            sx={{ width: 200 }}
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />

          <DatePicker
            sx={{ width: 200 }}
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </Stack>}

        <Stack alignItems="flex-end" justifyItems="center">
          <Box width={200}>
            <Button variant="contained" onClick={drawChart}>
              Draw Chart
            </Button>
          </Box>
        </Stack>

        <Stack alignItems="center" justifyContent="center">
          <BarChart width={1000} height={400} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="deviceLabel" />
            <YAxis domain={[0, 60]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="TotalEnergy" fill={theme.palette.primary.main} />
          </BarChart>
        </Stack> 
      </Stack>
    </LocalizationProvider>
  );
};
