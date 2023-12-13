import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, getLocations } from "../queries/LocationQueries";
import { CustomTable } from "../components/CustomTable";
import { useTheme } from "@emotion/react";
import moment from "moment";
import {
  addDevice,
  fetchDeviceTypes,
  fetchModelNumber,
} from "../queries/DeviceQueries";

const tableHeaders = [
  "LocationID",
  "Apt_no",
  "Street",
  "City",
  "Zip",
  "StartDate",
  "SquareFootage",
  "Bedrooms",
  "Occupants",
];

export const Locations = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.UserReducer);

  const [locations, setLocations] = useState([]);
  const [aptNo, setAptNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [squareFootage, setSquareFootage] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [occupants, setOccupants] = useState("");
  const [open, setOpen] = useState(false);

  // Add device statees
  const modelRef = useRef();
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [deviceModels, setDeviceModels] = useState([]);
  const [selectedLocationID, setSelectedLocationID] = useState("");
  const [selectedDeviceType, setSelectedDeviceType] = useState("AC");
  const [selectedModelNumber, setSelectedModelNumber] = useState("");

  const handleClose = () => setOpen(false);

  const getLocationsOfUser = async () => {
    try {
      const locations = await getLocations(user.userId, dispatch);
      setLocations(locations);
    } catch (e) {
      console.log(e);
    }
  };

  const addLocationForUser = async () => {
    if (
      aptNo !== "" &&
      street !== "" &&
      city !== "" &&
      zip !== "" &&
      squareFootage !== "" &&
      bedrooms !== "" &&
      occupants !== ""
    ) {
      try {
        const locationData = {
          Apt_no: aptNo,
          Street: street,
          City: city,
          State: state,
          Zip: zip,
          StartDate: moment().format("YYYY-MM-DD"),
          SquareFootage: squareFootage,
          Bedrooms: bedrooms,
          Occupants: occupants,
        };

        const isAdded = await addLocation(user.userId, locationData);

        setOpen(false);
        if (isAdded) {
          getLocationsOfUser();
        }
      } catch (e) {}
    } else {
      console.log("Incomplete fields");
    }
  };

  const getDeviceTypes = async () => {
    try {
      const responseData = await fetchDeviceTypes();
      setDeviceTypes(responseData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLocationsOfUser();
    getDeviceTypes();
  }, []);

  const selectDeviceType = async (e) => {
    setSelectedDeviceType(e.target.value);
    const responseData = await fetchModelNumber(e.target.value);
    setDeviceModels(responseData);
  };


  const addDeviceForLocation = async () => {
    console.log("selected model number", selectedModelNumber);

    try {
      await addDevice(
        user.userId,
        selectedLocationID,
        selectedDeviceType,
        modelRef.current.value
      );
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <Stack gap="2rem">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            border: "2px solid",
            backgroundColor: theme.palette.primary.dark,
            borderColor: theme.palette.secondary.main,
            boxShadow: 24,
            p: 4,
          }}
          gap="1rem"
        >
          <Box>
            <Typography variant="h6" color="secondary" textAlign="center">
              ADD LOCATION
            </Typography>
          </Box>
          <Stack gap="1rem">
            <TextField
              variant="outlined"
              label="Apt no"
              color="secondary"
              type="text"
              // error={aptNo !== ""}
              onChange={(e) => setAptNo(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Street"
              color="secondary"
              type="text"
              // error={emailError !== ""}
              onChange={(e) => setStreet(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="City"
              color="secondary"
              type="text"
              // error={emailError !== ""}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="State"
              color="secondary"
              type="text"
              // error={emailError !== ""}
              onChange={(e) => setState(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Zip"
              color="secondary"
              type="number"
              // error={emailError !== ""}
              onChange={(e) => setZip(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Square Footage"
              color="secondary"
              type="number"
              // error={emailError !== ""}
              onChange={(e) => setSquareFootage(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Bedrooms"
              color="secondary"
              type="number"
              // error={emailError !== ""}
              onChange={(e) => setBedrooms(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Occupants"
              color="secondary"
              type="number"
              // error={emailError !== ""}
              onChange={(e) => setOccupants(e.target.value)}
            />

            <Button variant="contained" onClick={addLocationForUser}>
              ADD
            </Button>
          </Stack>
        </Stack>
      </Modal>

      <Typography variant="h3" color="secondary" textAlign="center">
        LOCATIONS
      </Typography>

      <CustomTable
        headers={tableHeaders}
        items={locations}
        tableFor="locations"
      />
      <Stack alignItems="flex-end" justifyContent="center">
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{ width: "200px" }}
        >
          Add Location
        </Button>
      </Stack>

      <Typography variant="h3" color="secondary" textAlign="center">
        ADD DEVICE
      </Typography>

      <Stack alignItems="center" width="100%">
        <Stack
          width="30%"
          border="1px solid #EEEEEE"
          p="1rem"
          // alignItems="center"
          gap="1rem"
        >
          <Stack direction="row" alignItems="center" gap="1rem">
            <InputLabel
              sx={{ flex: 1 }}
              htmlFor="locatio-select"
              id="location-id"
            >
              Location ID
            </InputLabel>
            <select
              value={selectedLocationID}
              onChange={(e) => setSelectedLocationID(e.target.value)}
              style={{
                flex: 1,
                border: "1px solid #EEEEEE",
                backgroundColor: "transparent",
                color: "#EEEEEE",
                height: "30px",
              }}
            >
              {locations.map((location) => (
                <option value={location.LocationID}>
                  {location.LocationID}
                </option>
              ))}
            </select>
          </Stack>
          <Stack direction="row" alignItems="center" gap="1rem">
            <InputLabel
              sx={{ flex: 1 }}
              htmlFor="location-select"
              id="location-id"
            >
              Device Types
            </InputLabel>
            <select
              value={selectedDeviceType}
              onChange={(e) => selectDeviceType(e)}
              style={{
                flex: 1,
                border: "1px solid #EEEEEE",
                backgroundColor: "transparent",
                color: "#EEEEEE",
                height: "30px",
              }}
            >
              {deviceTypes.map((deviceType) => (
                <option value={deviceType.Type}>{deviceType.Type}</option>
              ))}
            </select>
          </Stack>
          <Stack direction="row" alignItems="center" gap="1rem">
            <InputLabel
              sx={{ flex: 1 }}
              htmlFor="locatio-select"
              id="location-id"
            >
              Model Number
            </InputLabel>
            <select
              // onBlur={(e) => selectModelNumber(e)}
              ref={modelRef}
              style={{
                flex: 1,
                border: "1px solid #EEEEEE",
                backgroundColor: "transparent",
                color: "#EEEEEE",
                height: "30px",
              }}
            >
              {deviceModels.map((model) => (
                <option value={model.ModelNumber}>{model.ModelNumber}</option>
              ))}
            </select>
          </Stack>

          <Button variant="contained" onClick={addDeviceForLocation}>
            ADD DEVICE
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
