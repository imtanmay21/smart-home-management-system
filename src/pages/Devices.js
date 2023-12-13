import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomTable } from "../components/CustomTable";
import { getAllDevices } from "../queries/DeviceQueries";
import { useSelector } from "react-redux";

const headers = ["EnrolledDeviceID", "LocationID", "ModelNumber", "Type"];

export const Devices = () => {
  const { user } = useSelector((state) => state.UserReducer);

  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);

  const getDevices = async () => {
    try {
      const responseData = await getAllDevices(user.userId);
      setDevices(responseData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <Stack>
      <Typography variant="h3" color="secondary" textAlign="center">
        DEVICES
      </Typography>

      <CustomTable headers={headers} items={devices} />
    </Stack>
  );
};
