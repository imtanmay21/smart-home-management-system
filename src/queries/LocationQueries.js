import axios from "axios";
import { LocationActionTypes } from "../store/LocationReducer/LocationActionTypes";

const baseUrl = "http://127.0.0.1:5000";

// ----------------------------------
// ---------- GET LOCATIONS----------
// ----------------------------------
export const getLocations = async (userId, dispatch) => {
  const response = await axios.get(`${baseUrl}/locations/${userId}/list`);

  if (response.status === 200) {
    dispatch({
      type: LocationActionTypes.SET_LOCATIONS,
      payload: { locations: response.data },
    });
    return response.data;
  } else {
    console.error(response.status, "Something went wrong");
  }
};

// ----------------------------------
// ---------- ADD LOCATION-----------
// ----------------------------------
export const addLocation = async (userId, location) => {
  console.log("location data", location);
  const response = await axios.post(
    `${baseUrl}/locations/${userId}/add`,
    location
  );

  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
};
