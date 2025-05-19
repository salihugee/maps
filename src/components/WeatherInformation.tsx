import React, { useState, useEffect } from 'react';
import { Cloud, CloudSnow, CloudRain, Wind, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface WeatherCondition {
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitationChance: number;
}

interface WeatherRisk {
    type: string;
    date: string;
    severity: 'Low' | 'Medium' | 'High';
    description: string;
}

interface CurrentWeather {
    lga: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    precipitation: string;
    cloudCover: string;
    location: string;
    observationTime: string;
}

interface WeatherData {
    current: CurrentWeather;
    forecast: WeatherCondition[];
    risks: WeatherRisk[];
    tips: string[];
}

// Dummy data for weather information (replace with actual data)
const dummyWeatherData: WeatherData = {
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

const WeatherInformation: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchLocation, setSearchLocation] = useState<string>('');

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async (): Promise<void> => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
                setWeatherData(dummyWeatherData); // Use dummy data
            } catch (err) {
                setError('An error occurred while fetching weather data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getWeatherIcon = (condition: string): JSX.Element => {
        switch (condition.toLowerCase()) {
            case 'sunny':
                return <Cloud className="h-6 w-6 text-yellow-500" />;
            case 'cloudy':
                return <Cloud className="h-6 w-6 text-gray-500" />;
            case 'rainy':
                return <CloudRain className="h-6 w-6 text-blue-500" />;
            case 'snowy':
                return <CloudSnow className="h-6 w-6 text-white" />;
            default:
                return <Cloud className="h-6 w-6 text-gray-500" />;
        }
    };

    const filteredForecast = weatherData?.forecast.filter((day) =>
        weatherData.current.location.toLowerCase().includes(searchLocation.toLowerCase())
    ) ?? [];

    return (
        <div className="container mx-auto p-4 text-gray-700">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Weather Information</h1>

            {/* Location Search Input */}
            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Search by location (e.g., Kaduna)"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full md:w-1/2 lg:w-1/3"
                />
            </div>

            {loading ? (
                <div
                    className="flex justify-center items-center h-48"
                    aria-live="polite"
                    aria-busy="true"
                >
                    <Loader2 className="animate-spin text-4xl text-gray-500" />
                </div>
            ) : error ? (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : weatherData ? (
                <>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Conditions</h2>
                    <Card className="mb-6">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <MapPin className="h-6 w-6 text-blue-500" />
                            <CardTitle className="text-lg font-semibold">
                                {weatherData.current.lga}, {weatherData.current.location}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600">
                                        Temperature: <span className="font-medium">{weatherData.current.temperature}&deg;C</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Humidity: <span className="font-medium">{weatherData.current.humidity}%</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Wind: <span className="font-medium">{weatherData.current.windSpeed} km/h {weatherData.current.windDirection}</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Precipitation: <span className="font-medium">{weatherData.current.precipitation}</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Cloud Cover: <span className="font-medium">{weatherData.current.cloudCover}</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">
                                        Observation Time: <span className="font-medium">{weatherData.current.observationTime}</span>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Forecast</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {filteredForecast.map((day) => (
                            <Card key={day.date} className="transition-transform transform hover:scale-105 hover:shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">{day.date}</CardTitle>
                                    <div className="flex items-center gap-2">
                                        {getWeatherIcon(day.condition)}
                                        <CardDescription>{day.condition}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        High: <span className="font-medium">{day.high}&deg;C</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Low: <span className="font-medium">{day.low}&deg;C</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Precipitation Chance: <span className="font-medium">{day.precipitationChance}%</span>
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Weather Risks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                        {weatherData.risks.map((risk, index) => (
                            <Card
                                key={index}
                                className={cn(
                                    'transition-transform transform hover:scale-105 hover:shadow-lg',
                                    risk.severity === 'High' && 'border-2 border-red-500',
                                    risk.severity === 'Medium' && 'border-2 border-yellow-500',
                                    risk.severity === 'Low' && 'border-2 border-green-500'
                                )}
                            >
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">{risk.type}</CardTitle>
                                    <CardDescription>Date: {risk.date}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Severity:{' '}
                                        <span
                                            className={cn(
                                                'font-medium',
                                                risk.severity === 'High' && 'text-red-500',
                                                risk.severity === 'Medium' && 'text-yellow-500',
                                                risk.severity === 'Low' && 'text-green-500'
                                            )}
                                        >
                                            {risk.severity}
                                        </span>
                                    </p>
                                    <p className="text-gray-700">{risk.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Weather Tips</h2>
                    <ul className="list-disc list-inside space-y-2">
                        {weatherData.tips.map((tip, index) => (
                            <li key={index} className="text-gray-600">
                                {tip}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No weather data available.</p>
            )}
        </div>
    );
};

export default WeatherInformation;
