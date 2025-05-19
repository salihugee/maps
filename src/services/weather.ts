import axios from "axios";

const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherData = async (lat: number, lon: number) => {
    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                lat,
                lon,
                units: "metric",
                appid: WEATHER_API_KEY,
            },
        });
        return response.data.main.temp;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};
