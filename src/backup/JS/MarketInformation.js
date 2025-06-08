import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Store, TrendingUp, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
// Dummy data for market information (replace with actual data)
const dummyMarketData = [
    {
        id: 1,
        product: 'Maize',
        price: 150,
        unit: 'per kg',
        date: '2024-07-28',
        trend: 'Stable',
    },
    {
        id: 2,
        product: 'Rice',
        price: 250,
        unit: 'per kg',
        date: '2024-07-28',
        trend: 'Increasing',
    },
    {
        id: 3,
        product: 'Beans',
        price: 300,
        unit: 'per kg',
        date: '2024-07-28',
        trend: 'Decreasing',
    },
    {
        id: 4,
        product: 'Cassava',
        price: 50,
        unit: 'per kg',
        date: '2024-07-28',
        trend: 'Stable',
    },
    {
        id: 5,
        product: 'Yam',
        price: 200,
        unit: 'per kg',
        date: '2024-07-28',
        trend: 'Increasing',
    },
    {
        id: 6,
        product: 'Cocoa',
        price: 2500,
        unit: 'per kg',
        date: '2024-07-28',
        trend: 'Increasing',
    },
    {
        id: 7,
        product: 'Palm Oil',
        price: 1200,
        unit: 'per liter',
        date: '2024-07-28',
        trend: 'Stable',
    },
    {
        id: 8,
        product: 'Groundnut',
        price: 400,
        unit: 'per kg',
        date: '2024-07-28',
        trend: 'Decreasing',
    },
];
const MarketInformation = () => {
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
                setMarketData(dummyMarketData); // Use dummy data
            }
            catch (err) {
                setError('An error occurred while fetching market data.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const filteredData = marketData.filter((item) => item.product.toLowerCase().includes(searchTerm.toLowerCase()));
    const getTrendIcon = (trend) => {
        const trendClasses = {
            Increasing: 'text-green-500',
            Decreasing: 'text-red-500 rotate-180',
            Stable: 'text-gray-500 rotate-45',
        };
        return _jsx(TrendingUp, { className: `h-4 w-4 ${trendClasses[trend] || ''}` });
    };
    return (_jsxs("div", { className: "container mx-auto p-4 text-gray-700", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Market Information" }), _jsx("div", { className: "mb-6", children: _jsx(Input, { type: "text", placeholder: "Search products...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full md:w-1/2 lg:w-1/3" }) }), loading ? (_jsx("div", { className: "flex justify-center items-center h-48", "aria-live": "polite", "aria-busy": "true", children: _jsx(Loader2, { className: "animate-spin text-4xl text-gray-500" }) })) : error ? (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] })) : filteredData.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No matching products found." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredData.map((item) => (_jsxs(Card, { className: "transition-transform transform hover:scale-105 hover:shadow-lg", children: [_jsxs(CardHeader, { className: "flex flex-row items-center gap-4", children: [_jsx(Store, { className: "h-6 w-6 text-green-500" }), _jsx(CardTitle, { className: "text-lg font-semibold", children: item.product })] }), _jsxs(CardContent, { children: [_jsxs("p", { className: "text-xl font-bold text-gray-700", children: ["Price: \u20A6", item.price, ' ', _jsx("span", { className: "text-gray-500", children: item.unit })] }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Date: ", item.date] }), _jsxs("div", { className: "mt-2 flex items-center gap-2", children: [_jsx("span", { className: "text-gray-600 font-medium", children: "Trend:" }), getTrendIcon(item.trend), _jsx("span", { className: cn('font-medium', item.trend === 'Increasing' && 'text-green-500', item.trend === 'Decreasing' && 'text-red-500', item.trend === 'Stable' && 'text-gray-500'), children: item.trend })] })] })] }, item.id))) }))] }));
};
export default MarketInformation;
