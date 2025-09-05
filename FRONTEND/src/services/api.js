import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_URL;
console.log("Backend ip address: ", import.meta.env.VITE_APP_URL);
axios.defaults.timeout = 50000;
axios.defaults.withCredentials = true;

export async function postData(endpoint, requestBody = {}, headers = {}) {
  try {
    const response = await axios.post(BASE_URL + endpoint, requestBody, {
      headers: headers,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export async function getData(endpoint, requestHeaders = {}, queryParams = {}) {
  try {
    const response = await axios.get(BASE_URL + endpoint, {
      headers: requestHeaders,
      params: queryParams,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}

export async function deleteData(endpoint, requestHeaders = {}) {
  try {
    const response = await axios.delete(BASE_URL + endpoint, {
      headers: requestHeaders,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}

export async function putData(endpoint, requestBody, requestHeaders = {}) {
  try {
    const response = await axios.put(BASE_URL + endpoint, requestBody, {
      headers: requestHeaders,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}
