import axios from "axios";

const baseUrl = "http://127.0.0.1:5000/devices";

export const getEnergyPerDeviceAtLocation = async (
  locationID,
  startDate,
  endDate
) => {
  const response = await axios.get(`${baseUrl}/energy-consumption-per-device`, {
    params: {
      location_id: locationID,
      start_date: startDate,
      end_date: endDate
    }
  })
  return response.data
};

export const getDevicesEnergy24Hours = async (userId) => {
  const response = await axios.get(`${baseUrl}/customer/${userId}/devices_energy_24_hours`);
  return response.data
}
export const getDevicesEnergyWeek = async (userId) => {
  const response = await axios.get(`${baseUrl}/customer/${userId}/devices_energy_week`);
  return response.data
}
export const getDevicesEnergyMonth = async (userId) => {
  const response = await axios.get(`${baseUrl}/customer/${userId}/devices_energy_month`);
  return response.data
}
export const getDevicesEnergyYear = async (userId) => {
  const response = await axios.get(`${baseUrl}/customer/${userId}/devices_energy_year`);
  return response.data
}


