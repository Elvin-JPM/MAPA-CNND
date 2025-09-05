import { getData } from "./api";

export async function getMapData() {
  try {
    const response = await getData("/map_data");
    console.log("Response from /map_data: ", response);
    return response;
  } catch (error) {
    console.log("Error to get map data from the /map_data route: ", error);
    throw error;
  }
}
