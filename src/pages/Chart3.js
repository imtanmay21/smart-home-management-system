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
import {
  getDevicesEnergy24Hours,
  getDevicesEnergyMonth,
  getDevicesEnergyWeek,
  getDevicesEnergyYear,
  getEnergyPerDeviceAtLocation,
  getMonthlyConsumptions,
} from "../queries/chartQueries";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
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

export const Chart3 = () => {
  const { locations } = useSelector((state) => state.LocationReducer);
  const theme = useTheme();

  const [selectedLocationID, setSelectedLocationID] = useState(
    locations.length > 0 ? locations[0].LocationID : null
  );
  const [lineData, setLineData] = useState([]);

  const drawChart = async () => {
    try {
      const responseData = await getMonthlyConsumptions(selectedLocationID);
      console.log("response data", responseData);
      const filteredData = responseData
        .filter((item) => moment(item.MonthYear, "YYYY-MM").year() !== 2022)
        .map((item) => {
          const date = moment(item.MonthYear, "YYYY-MM");
          return {
            month: date.format("MMM"),
            totalEnergy: parseFloat(item.TotalEnergy),
          };
        });

      setLineData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack gap="2rem">
        <Typography textAlign="center" variant="h3" color="secondary">
          Monthly Energy Consumption per Location
        </Typography>

        <Stack direction="row" justifyContent="center">
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
        </Stack>

        <Stack alignItems="flex-end" justifyItems="center">
          <Box width={200}>
            <Button variant="contained" onClick={drawChart}>
              Draw Chart
            </Button>
          </Box>
        </Stack>

        <Stack alignItems="center" justifyContent="center">
          <LineChart
            width={1000}
            height={400}
            data={lineData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalEnergy"
              stroke={theme.palette.primary.main}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};
