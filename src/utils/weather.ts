import axios from "axios";

const API_KEY = 'a09076109c83b6df30bacf1ff2d2e96e'; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch temperature for a given location
export const fetchTemperature = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        units: "metric", // Use "metric" for Celsius
        appid: API_KEY,
      },
    });

    return response.data.main.temp; // Extract temperature
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
