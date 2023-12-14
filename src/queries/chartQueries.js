import axios from "axios";
import moment from "moment";

const deviceBaseUrl = "http://127.0.0.1:5000/devices";
const energyBaseUrl = "http://127.0.0.1:5000/energy";

export const getEnergyPerDeviceAtLocation = async (
  locationID,
  startDate,
  endDate
) => {
  startDate = moment(startDate).format("YYYY-MM-DD");
  endDate = moment(endDate).format("YYYY-MM-DD");

  const response = await axios.get(
    `${deviceBaseUrl}/energy-consumption-per-device`,
    {
      params: {
        location_id: locationID,
        start_date: startDate,
        end_date: endDate,
      },
    }
  );
  return response.data;
};

export const getMonthlyConsumptions = async (locationId) => {
  const response = await axios.get(
    `${energyBaseUrl}/monthly-energy-consumption`,
    {
      params: {
        location_id: locationId,
      },
    }
  );
  return response.data;
};

export const getEnergyConsumptionsOfLocations = async (userId) => {
  const response = await axios.get(
    `${energyBaseUrl}/customer/${userId}/energy-per-location`
  );
  return response.data;
};

export const getDevicesEnergy24Hours = async (userId) => {
  const response = await axios.get(
    `${deviceBaseUrl}/customer/${userId}/devices_energy_24_hours`
  );
  return response.data;
};
export const getDevicesEnergyWeek = async (userId) => {
  const response = await axios.get(
    `${deviceBaseUrl}/customer/${userId}/devices_energy_week`
  );
  return response.data;
};
export const getDevicesEnergyMonth = async (userId) => {
  const response = await axios.get(
    `${deviceBaseUrl}/customer/${userId}/devices_energy_month`
  );
  return response.data;
};
export const getDevicesEnergyYear = async (userId) => {
  const response = await axios.get(
    `${deviceBaseUrl}/customer/${userId}/devices_energy_year`
  );
  return response.data;
};
