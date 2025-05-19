import axios from "axios";

// Function to fetch temperature for a given location
export const fetchTemperature = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(import.meta.env.VITE_WEATHER_API_URL, {
      params: {
        lat,
        lon,
        units: "metric", // Use "metric" for Celsius
        appid: import.meta.env.VITE_WEATHER_API_KEY,
      },
    });

    return response.data.main.temp; // Extract temperature
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
