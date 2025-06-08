import React, { useState, useEffect } from 'react';
import { Store, TrendingUp, Loader2 } from 'lucide-react'; //Search, 
// import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'; //CardDescription, 
import { Input } from '../components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { cn } from '../lib/utils';

interface MarketItem {
    id: number;
    product: string;
    price: number;
    unit: string;
    date: string;
    trend: 'Increasing' | 'Decreasing' | 'Stable';
}

// Dummy data for market information (replace with actual data)
const dummyMarketData: MarketItem[] = [
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

const MarketInformation: React.FC = () => {
    const [marketData, setMarketData] = useState<MarketItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async (): Promise<void> => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
                setMarketData(dummyMarketData); // Use dummy data
            } catch (err) {
                setError('An error occurred while fetching market data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = marketData.filter((item) =>
        item.product.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTrendIcon = (trend: MarketItem['trend']) => {
        const trendClasses = {
            Increasing: 'text-green-500',
            Decreasing: 'text-red-500 rotate-180',
            Stable: 'text-gray-500 rotate-45',
        };
        return <TrendingUp className={`h-4 w-4 ${trendClasses[trend] || ''}`} />;
    };

    return (
        <div className="container mx-auto p-4 text-gray-700">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Market Information</h1>

            {/* Search Input */}
            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
            ) : filteredData.length === 0 ? (
                <p className="text-gray-500">No matching products found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((item) => (
                        <Card
                            key={item.id}
                            className="transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Store className="h-6 w-6 text-green-500" />
                                <CardTitle className="text-lg font-semibold">{item.product}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xl font-bold text-gray-700">
                                    Price: &#8358;{item.price}{' '}
                                    <span className="text-gray-500">{item.unit}</span>
                                </p>
                                <p className="text-sm text-gray-500">Date: {item.date}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-gray-600 font-medium">Trend:</span>
                                    {getTrendIcon(item.trend)}
                                    <span
                                        className={cn(
                                            'font-medium',
                                            item.trend === 'Increasing' && 'text-green-500',
                                            item.trend === 'Decreasing' && 'text-red-500',
                                            item.trend === 'Stable' && 'text-gray-500'
                                        )}
                                    >
                                        {item.trend}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MarketInformation;
