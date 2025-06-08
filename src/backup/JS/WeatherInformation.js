import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Cloud, CloudSnow, CloudRain, MapPin, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
// Dummy data for weather information (replace with actual data)
const dummyWeatherData = {
    current: {
        lga: 'Kaduna South',
        temperature: 28,
        humidity: 60,
        windSpeed: 10,
        windDirection: 'SW',
        precipitation: '0 mm',
        cloudCover: 'Partly Cloudy',
        location: 'Kaduna, Nigeria',
        observationTime: '2024-07-28 14:00',
    },
    forecast: [
        {
            date: '2024-07-29',
            high: 32,
            low: 22,
            condition: 'Sunny',
            precipitationChance: 10,
        },
        {
            date: '2024-07-30',
            high: 30,
            low: 20,
            condition: 'Cloudy',
            precipitationChance: 40,
        },
        {
            date: '2024-07-31',
            high: 28,
            low: 18,
            condition: 'Rainy',
            precipitationChance: 80,
        },
        {
            date: '2024-08-01',
            high: 31,
            low: 21,
            condition: 'Partly Cloudy',
            precipitationChance: 20,
        },
        {
            date: '2024-08-02',
            high: 33,
            low: 23,
            condition: 'Sunny',
            precipitationChance: 5,
        },
    ],
    risks: [
        {
            type: 'Heatwave',
            date: '2024-08-01',
            severity: 'Medium',
            description: 'High temperatures expected. Take precautions to avoid heat stroke.',
        },
        {
            type: 'Heavy Rain',
            date: '2024-07-31',
            severity: 'High',
            description: 'Heavy rainfall expected. Potential for flooding in low-lying areas.',
        },
    ],
    tips: [
        'Stay hydrated by drinking plenty of water, especially during hot weather.',
        'Monitor weather forecasts regularly for updates.',
        'In case of heavy rain, avoid driving through flooded areas.',
        'Protect crops from extreme temperatures.',
        'Be aware of potential pest and disease outbreaks due to weather changes.',
    ],
};
const WeatherInformation = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchLocation, setSearchLocation] = useState('');
    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
                setWeatherData(dummyWeatherData); // Use dummy data
            }
            catch (err) {
                setError('An error occurred while fetching weather data.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const getWeatherIcon = (condition) => {
        switch (condition.toLowerCase()) {
            case 'sunny':
                return _jsx(Cloud, { className: "h-6 w-6 text-yellow-500" });
            case 'cloudy':
                return _jsx(Cloud, { className: "h-6 w-6 text-gray-500" });
            case 'rainy':
                return _jsx(CloudRain, { className: "h-6 w-6 text-blue-500" });
            case 'snowy':
                return _jsx(CloudSnow, { className: "h-6 w-6 text-white" });
            default:
                return _jsx(Cloud, { className: "h-6 w-6 text-gray-500" });
        }
    };
    const filteredForecast = weatherData?.forecast.filter((day) => weatherData.current.location.toLowerCase().includes(searchLocation.toLowerCase())) ?? [];
    return (_jsxs("div", { className: "container mx-auto p-4 text-gray-700", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Weather Information" }), _jsx("div", { className: "mb-6", children: _jsx(Input, { type: "text", placeholder: "Search by location (e.g., Kaduna)", value: searchLocation, onChange: (e) => setSearchLocation(e.target.value), className: "w-full md:w-1/2 lg:w-1/3" }) }), loading ? (_jsx("div", { className: "flex justify-center items-center h-48", "aria-live": "polite", "aria-busy": "true", children: _jsx(Loader2, { className: "animate-spin text-4xl text-gray-500" }) })) : error ? (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] })) : weatherData ? (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-700 mb-4", children: "Current Conditions" }), _jsxs(Card, { className: "mb-6", children: [_jsxs(CardHeader, { className: "flex flex-row items-center gap-4", children: [_jsx(MapPin, { className: "h-6 w-6 text-blue-500" }), _jsxs(CardTitle, { className: "text-lg font-semibold", children: [weatherData.current.lga, ", ", weatherData.current.location] })] }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-gray-600", children: ["Temperature: ", _jsxs("span", { className: "font-medium", children: [weatherData.current.temperature, "\u00B0C"] })] }), _jsxs("p", { className: "text-gray-600", children: ["Humidity: ", _jsxs("span", { className: "font-medium", children: [weatherData.current.humidity, "%"] })] }), _jsxs("p", { className: "text-gray-600", children: ["Wind: ", _jsxs("span", { className: "font-medium", children: [weatherData.current.windSpeed, " km/h ", weatherData.current.windDirection] })] }), _jsxs("p", { className: "text-gray-600", children: ["Precipitation: ", _jsx("span", { className: "font-medium", children: weatherData.current.precipitation })] }), _jsxs("p", { className: "text-gray-600", children: ["Cloud Cover: ", _jsx("span", { className: "font-medium", children: weatherData.current.cloudCover })] })] }), _jsx("div", { children: _jsxs("p", { className: "text-gray-600", children: ["Observation Time: ", _jsx("span", { className: "font-medium", children: weatherData.current.observationTime })] }) })] }) })] }), _jsx("h2", { className: "text-2xl font-semibold text-gray-700 mb-4", children: "Forecast" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6", children: filteredForecast.map((day) => (_jsxs(Card, { className: "transition-transform transform hover:scale-105 hover:shadow-lg", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg font-semibold", children: day.date }), _jsxs("div", { className: "flex items-center gap-2", children: [getWeatherIcon(day.condition), _jsx(CardDescription, { children: day.condition })] })] }), _jsxs(CardContent, { children: [_jsxs("p", { className: "text-gray-600", children: ["High: ", _jsxs("span", { className: "font-medium", children: [day.high, "\u00B0C"] })] }), _jsxs("p", { className: "text-gray-600", children: ["Low: ", _jsxs("span", { className: "font-medium", children: [day.low, "\u00B0C"] })] }), _jsxs("p", { className: "text-gray-600", children: ["Precipitation Chance: ", _jsxs("span", { className: "font-medium", children: [day.precipitationChance, "%"] })] })] })] }, day.date))) }), _jsx("h2", { className: "text-2xl font-semibold text-gray-700 mb-4", children: "Weather Risks" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6", children: weatherData.risks.map((risk, index) => (_jsxs(Card, { className: cn('transition-transform transform hover:scale-105 hover:shadow-lg', risk.severity === 'High' && 'border-2 border-red-500', risk.severity === 'Medium' && 'border-2 border-yellow-500', risk.severity === 'Low' && 'border-2 border-green-500'), children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg font-semibold", children: risk.type }), _jsxs(CardDescription, { children: ["Date: ", risk.date] })] }), _jsxs(CardContent, { children: [_jsxs("p", { className: "text-gray-600", children: ["Severity:", ' ', _jsx("span", { className: cn('font-medium', risk.severity === 'High' && 'text-red-500', risk.severity === 'Medium' && 'text-yellow-500', risk.severity === 'Low' && 'text-green-500'), children: risk.severity })] }), _jsx("p", { className: "text-gray-700", children: risk.description })] })] }, index))) }), _jsx("h2", { className: "text-2xl font-semibold text-gray-700 mb-4", children: "Weather Tips" }), _jsx("ul", { className: "list-disc list-inside space-y-2", children: weatherData.tips.map((tip, index) => (_jsx("li", { className: "text-gray-600", children: tip }, index))) })] })) : (_jsx("p", { children: "No weather data available." }))] }));
};
export default WeatherInformation;
