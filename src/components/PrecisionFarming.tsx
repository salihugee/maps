import React, { useState, useEffect, ReactElement } from 'react';
import { Zap, MapPin, Droplet, Activity, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

interface Technique {
    id: number;
    name: string;
    description: string;
    icon: ReactElement;
}

// Dummy data for precision farming techniques (replace with actual data)
const dummyTechniques: Technique[] = [
    {
        id: 1,
        name: 'GPS-Guided Farming',
        description: 'Uses GPS technology to improve accuracy in field operations like planting, fertilizing, and harvesting.',
        icon: <MapPin className="h-6 w-6 text-blue-500" />,
    },
    {
        id: 2,
        name: 'Variable Rate Irrigation (VRI)',
        description: 'Adjusts the amount of water applied to different parts of the field based on specific needs.',
        icon: <Droplet className="h-6 w-6 text-blue-500" />,
    },
    {
        id: 3,
        name: 'Yield Monitoring',
        description: 'Measures and records the yield of crops during harvest to identify areas of high and low productivity.',
        icon: <Activity className="h-6 w-6 text-blue-500" />,
    },
    {
        id: 4,
        name: 'Remote Sensing',
        description: 'Uses satellite or aerial imagery to monitor crop health, identify stress, and detect pests or diseases.',
        icon: <Zap className="h-6 w-6 text-blue-500" />,
    },
    {
        id: 5,
        name: 'Soil Mapping',
        description: 'Creates detailed maps of soil properties to guide decisions on fertilization and other inputs.',
        icon: <MapPin className="h-6 w-6 text-blue-500" />,
    },
];

const PrecisionFarming: React.FC = () => {
    const [techniques, setTechniques] = useState<Technique[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async (): Promise<void> => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
                setTechniques(dummyTechniques); // Use dummy data
            } catch (err) {
                setError('An error occurred while fetching precision farming techniques.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredTechniques = techniques.filter((technique) =>
        technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        technique.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Precision Farming Techniques</h1>

            {/* Search Input */}
            <div className="mb-6 text-gray-500">
                <Input
                    type="text"
                    placeholder="Search techniques..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 lg:w-1/3 text-gray-600"
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
            ) : filteredTechniques.length === 0 ? (
                <p className="text-gray-500">No matching techniques found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTechniques.map((technique) => (
                        <Card
                            key={technique.id}
                            className="transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col"
                        >
                            <CardHeader className="flex flex-row items-center gap-4 text-gray-700">
                                {technique.icon}
                                <CardTitle className="text-lg font-semibold">{technique.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 text-gray-500">
                                <CardDescription>{technique.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PrecisionFarming;
