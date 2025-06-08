import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Zap, MapPin, Droplet, Activity, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// Dummy data for precision farming techniques (replace with actual data)
const dummyTechniques = [
    {
        id: 1,
        name: 'GPS-Guided Farming',
        description: 'Uses GPS technology to improve accuracy in field operations like planting, fertilizing, and harvesting.',
        icon: _jsx(MapPin, { className: "h-6 w-6 text-blue-500" }),
    },
    {
        id: 2,
        name: 'Variable Rate Irrigation (VRI)',
        description: 'Adjusts the amount of water applied to different parts of the field based on specific needs.',
        icon: _jsx(Droplet, { className: "h-6 w-6 text-blue-500" }),
    },
    {
        id: 3,
        name: 'Yield Monitoring',
        description: 'Measures and records the yield of crops during harvest to identify areas of high and low productivity.',
        icon: _jsx(Activity, { className: "h-6 w-6 text-blue-500" }),
    },
    {
        id: 4,
        name: 'Remote Sensing',
        description: 'Uses satellite or aerial imagery to monitor crop health, identify stress, and detect pests or diseases.',
        icon: _jsx(Zap, { className: "h-6 w-6 text-blue-500" }),
    },
    {
        id: 5,
        name: 'Soil Mapping',
        description: 'Creates detailed maps of soil properties to guide decisions on fertilization and other inputs.',
        icon: _jsx(MapPin, { className: "h-6 w-6 text-blue-500" }),
    },
];
const PrecisionFarming = () => {
    const [techniques, setTechniques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
                setTechniques(dummyTechniques); // Use dummy data
            }
            catch (err) {
                setError('An error occurred while fetching precision farming techniques.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const filteredTechniques = techniques.filter((technique) => technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        technique.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Precision Farming Techniques" }), _jsx("div", { className: "mb-6 text-gray-500", children: _jsx(Input, { type: "text", placeholder: "Search techniques...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full md:w-1/2 lg:w-1/3 text-gray-600" }) }), loading ? (_jsx("div", { className: "flex justify-center items-center h-48", "aria-live": "polite", "aria-busy": "true", children: _jsx(Loader2, { className: "animate-spin text-4xl text-gray-500" }) })) : error ? (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] })) : filteredTechniques.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No matching techniques found." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredTechniques.map((technique) => (_jsxs(Card, { className: "transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col", children: [_jsxs(CardHeader, { className: "flex flex-row items-center gap-4 text-gray-700", children: [technique.icon, _jsx(CardTitle, { className: "text-lg font-semibold", children: technique.name })] }), _jsx(CardContent, { className: "flex-1 text-gray-500", children: _jsx(CardDescription, { children: technique.description }) })] }, technique.id))) }))] }));
};
export default PrecisionFarming;
