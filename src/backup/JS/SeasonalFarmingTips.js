import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { Sprout, CalendarDays, BookOpen, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
const dummyTips = [
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
const renderSeasonButton = (season, label, selectedSeason, setSelectedSeason) => {
    return (_jsx(Button, { onClick: () => setSelectedSeason(season), className: `px-4 py-2 rounded ${selectedSeason === season
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`, "aria-pressed": selectedSeason === season, children: label }));
};
const SeasonalFarmingTips = () => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSeason, setSelectedSeason] = useState(null);
    const seasons = useMemo(() => {
        const sourceData = tips.length > 0 ? tips : dummyTips;
        return [...new Set(sourceData.map((tip) => tip.season))];
    }, [tips]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setTips(dummyTips);
            }
            catch (err) {
                setError('An error occurred while fetching farming tips.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const filteredTips = useMemo(() => {
        return tips.filter((tip) => {
            const searchMatch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tip.content.toLowerCase().includes(searchTerm.toLowerCase());
            const seasonMatch = !selectedSeason || tip.season === selectedSeason;
            return searchMatch && seasonMatch;
        });
    }, [tips, searchTerm, selectedSeason]);
    return (_jsxs("div", { className: "container mx-auto p-4 text-gray-700", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Seasonal Farming Tips" }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [_jsx(Input, { type: "text", placeholder: "Search tips...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full md:w-1/2 lg:w-1/3", "aria-label": "Search farming tips" }), _jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [_jsx("span", { className: "text-gray-700 font-medium mr-2", children: "Filter by Season:" }), renderSeasonButton(null, 'All', selectedSeason, setSelectedSeason), seasons.map((season) => renderSeasonButton(season, season, selectedSeason, setSelectedSeason))] })] }), loading ? (_jsxs("div", { className: "flex flex-col justify-center items-center h-48", "aria-live": "polite", children: [_jsx(Loader2, { className: "animate-spin h-10 w-10 text-green-600" }), _jsx("p", { className: "text-gray-500 mt-4", children: "Please wait while we load the tips..." })] })) : error ? (_jsxs(Alert, { variant: "destructive", role: "alert", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] })) : filteredTips.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-10", children: "No matching tips found." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredTips.map((tip) => (_jsxs(Card, { className: "transition-transform transform hover:scale-[1.03] hover:shadow-xl flex flex-col", children: [_jsxs(CardHeader, { className: "flex flex-row items-start gap-4 pb-2", children: [_jsx(Sprout, { className: "h-6 w-6 text-green-600 mt-1 flex-shrink-0" }), _jsxs("div", { className: "flex-grow", children: [_jsx(CardTitle, { className: "text-lg font-semibold leading-tight", children: tip.title }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [_jsx(CalendarDays, { className: "inline-block h-3 w-3 mr-1" }), tip.date] })] })] }), _jsxs(CardContent, { className: "flex-grow pt-2", children: [_jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mb-3", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(BookOpen, { className: "inline-block h-3 w-3 mr-1" }), "Season: ", tip.season] }), _jsxs("span", { className: "flex items-center", children: ["Category: ", tip.category] })] }), _jsx(CardDescription, { className: "text-gray-700 text-sm", children: tip.content })] })] }, tip.id))) }))] }));
};
export default SeasonalFarmingTips;
