import axios from "axios"

const baseUrl =  "http://127.0.0.1:5000/devices"

export const getAllDevices = async (userId) => {
  const response = await axios.get(`${baseUrl}/all-active-devices?customer_id=${userId}`)
  return response.data
}

export const fetchDeviceTypes = async () => {
  const response = await axios.get(`${baseUrl}/types`);

  return response.data
}

export const fetchModelNumber = async (deviceType) => {
  const response = await axios.get(`${baseUrl}/models?type=${deviceType}`);
  return response.data
}

export const addDevice = async (userId, locationId, deviceType, modelNumber) => {
  const intLocationId = parseInt(locationId)
  console.log("locationId", locationId)
  
  const deviceData = {
    customer_id: userId,
    location_id: intLocationId,
    device_type: deviceType,
    model_number: modelNumber
  };

  console.log("device data", deviceData)

  const response = await axios.post(`${baseUrl}/add`, deviceData)
}