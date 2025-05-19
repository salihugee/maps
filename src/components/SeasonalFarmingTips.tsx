import React, { useState, useEffect, useMemo } from 'react';
import { Sprout, Search, CalendarDays, BookOpen, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface FarmingTip {
    id: number;
    season: string;
    category: string;
    title: string;
    content: string;
    date: string;
}

const dummyTips: FarmingTip[] = [
    {
        id: 1,
        season: 'Rainy Season',
        category: 'Crop Planting',
        title: 'Preparing Your Fields for Planting',
        content: 'Ensure proper drainage to prevent waterlogging.  Till the soil and add organic matter. Select appropriate seeds for the season.',
        date: '2024-03-15',
    },
    {
        id: 2,
        season: 'Dry Season',
        category: 'Irrigation',
        title: 'Efficient Irrigation Techniques',
        content: 'Implement drip irrigation or use water-harvesting methods.  Water early in the morning or late in the evening to reduce evaporation.',
        date: '2024-08-01',
    },
    {
        id: 3,
        season: 'Rainy Season',
        category: 'Pest Control',
        title: 'Managing Common Pests',
        content: 'Monitor crops regularly for pests. Use organic pest control methods or apply pesticides as needed. Practice crop rotation.',
        date: '2024-04-01',
    },
    {
        id: 4,
        season: 'Dry Season',
        category: 'Soil Management',
        title: 'Maintaining Soil Health',
        content: 'Apply mulch to retain moisture.  Consider planting cover crops.  Test soil pH and nutrient levels.',
        date: '2024-09-01',
    },
    {
        id: 5,
        season: 'All Seasons',
        category: 'General',
        title: 'Best Farming Practices',
        content: 'Regularly monitor your crops. Keep records of planting, fertilization, and harvesting. Attend local farming workshops.',
        date: '2024-01-15',
    },
    {
        id: 6,
        season: 'Rainy Season',
        category: 'Crop Planting',
        title: 'Selecting the Right Crops',
        content: 'Choose crops that are well-suited to the rainy season in your region. Consider factors like waterlogging tolerance and disease resistance.',
        date: '2024-03-20',
    },
    {
        id: 7,
        season: 'Dry Season',
        category: 'Harvesting',
        title: 'Optimal Harvesting Time',
        content: 'Harvest your crops at the right time to maximize yield and quality.  Consider the maturity indicators for each crop.',
        date: '2024-10-10',
    },
    {
        id: 8,
        season: 'All Seasons',
        category: 'Financial Management',
        title: 'Managing Farm Finances',
        content: 'Keep accurate records of income and expenses. Develop a budget for the farming season. Explore financing options and government subsidies.',
        date: '2024-02-01',
    },
];

const renderSeasonButton = (
    season: string | null,
    label: string,
    selectedSeason: string | null,
    setSelectedSeason: (season: string | null) => void
): JSX.Element => {
    return (
        <Button
            onClick={() => setSelectedSeason(season)}
            className={`px-4 py-2 rounded ${
                selectedSeason === season
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-pressed={selectedSeason === season}
        >
            {label}
        </Button>
    );
};

const SeasonalFarmingTips: React.FC = () => {
    const [tips, setTips] = useState<FarmingTip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

    const seasons = useMemo<string[]>(() => {
        const sourceData = tips.length > 0 ? tips : dummyTips;
        return [...new Set(sourceData.map((tip) => tip.season))];
    }, [tips]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setTips(dummyTips);
            } catch (err) {
                setError('An error occurred while fetching farming tips.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredTips = useMemo<FarmingTip[]>(() => {
        return tips.filter((tip) => {
            const searchMatch =
                tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tip.content.toLowerCase().includes(searchTerm.toLowerCase());
            const seasonMatch = !selectedSeason || tip.season === selectedSeason;
            return searchMatch && seasonMatch;
        });
    }, [tips, searchTerm, selectedSeason]);

    return (
        <div className="container mx-auto p-4 text-gray-700">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Seasonal Farming Tips</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                    type="text"
                    placeholder="Search tips..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 lg:w-1/3"
                    aria-label="Search farming tips"
                />
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-gray-700 font-medium mr-2">Filter by Season:</span>
                    {renderSeasonButton(null, 'All', selectedSeason, setSelectedSeason)}
                    {seasons.map((season) =>
                        renderSeasonButton(season, season, selectedSeason, setSelectedSeason)
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col justify-center items-center h-48" aria-live="polite">
                    <Loader2 className="animate-spin h-10 w-10 text-green-600" />
                    <p className="text-gray-500 mt-4">Please wait while we load the tips...</p>
                </div>
            ) : error ? (
                <Alert variant="destructive" role="alert">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : filteredTips.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No matching tips found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTips.map((tip) => (
                        <Card key={tip.id} className="transition-transform transform hover:scale-[1.03] hover:shadow-xl flex flex-col">
                            <CardHeader className="flex flex-row items-start gap-4 pb-2">
                                <Sprout className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                                <div className="flex-grow">
                                    <CardTitle className="text-lg font-semibold leading-tight">{tip.title}</CardTitle>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <CalendarDays className="inline-block h-3 w-3 mr-1" />
                                        {tip.date}
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow pt-2">
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mb-3">
                                    <span className="flex items-center">
                                        <BookOpen className="inline-block h-3 w-3 mr-1" />
                                        Season: {tip.season}
                                    </span>
                                    <span className="flex items-center">
                                        Category: {tip.category}
                                    </span>
                                </div>
                                <CardDescription className="text-gray-700 text-sm">
                                    {tip.content}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SeasonalFarmingTips;
