import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { markets } from "../data/markets";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);
const Dashboard = () => {
    const [companies, setCompanies] = useState([]);
    const [lgacrops, setLgacrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const [companiesRes, lgaCropsRes] = await Promise.all([
                    fetch(`${API_URL}/companies`),
                    fetch(`${API_URL}/lga_crops`)
                ]);
                if (!companiesRes.ok) {
                    throw new Error('Failed to fetch companies');
                }
                if (!lgaCropsRes.ok) {
                    throw new Error('Failed to fetch LGA crops');
                }
                const [companiesData, lgaCropsData] = await Promise.all([
                    companiesRes.json(),
                    lgaCropsRes.json()
                ]);
                console.log('Companies data:', companiesData);
                console.log('LGA Crops data:', lgaCropsData);
                // Validate companies data
                if (!Array.isArray(companiesData)) {
                    throw new Error('Companies data is not an array');
                }
                // Validate and transform LGA crops data if needed
                if (!Array.isArray(lgaCropsData)) {
                    throw new Error('LGA Crops data is not an array');
                }
                // Map LGA crops data to match expected format
                const formattedLgaCrops = lgaCropsData.map(lga => ({
                    ...lga,
                    coordinates: Array.isArray(lga.coordinates) ? lga.coordinates : null,
                    crops: Array.isArray(lga.crops) ? lga.crops :
                        typeof lga.crops === 'string' ? lga.crops.split(',').map((c) => c.trim()) :
                            []
                }));
                setCompanies(companiesData);
                setLgacrops(formattedLgaCrops);
                setLoading(false);
            }
            catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return _jsx("div", { className: "text-center p-8", children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { className: "text-center p-8 text-red-500", children: ["Error: ", error] });
    } // Log data before processing
    console.log('Processing companies:', companies);
    console.log('Processing lgacrops:', lgacrops);
    // Summarize Companies by Category
    const companiesByCategory = companies.reduce((acc, company) => {
        console.log('Processing company:', company);
        if (company && company.category) {
            acc[company.category] = (acc[company.category] || 0) + 1;
        }
        return acc;
    }, {});
    console.log('Companies by category:', companiesByCategory);
    // Summarize Markets by LGA
    const marketsByLGA = markets.reduce((acc, market) => {
        acc[market.lga] = (acc[market.lga] || 0) + 1;
        return acc;
    }, {}); // Summarize Crops by LGA
    const cropsByLGA = lgacrops.reduce((acc, lga) => {
        console.log('Processing LGA:', lga);
        if (lga && lga.lga && Array.isArray(lga.crops)) {
            acc[lga.lga] = lga.crops.length;
        }
        return acc;
    }, {});
    console.log('Crops by LGA:', cropsByLGA);
    // Summarize Crop Distribution
    const cropDistribution = lgacrops.reduce((acc, lga) => {
        lga.crops.forEach((crop) => {
            acc[crop] = (acc[crop] || 0) + 1;
        });
        return acc;
    }, {});
    // Chart Data for Companies by Category
    const companiesChartData = {
        labels: Object.keys(companiesByCategory),
        datasets: [
            {
                label: "Number of Companies",
                data: Object.values(companiesByCategory),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            },
        ],
    };
    // Chart Data for Markets by LGA
    const marketsChartData = {
        labels: Object.keys(marketsByLGA),
        datasets: [
            {
                label: "Number of Markets",
                data: Object.values(marketsByLGA),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            },
        ],
    };
    // Chart Data for Crops by LGA
    const cropsByLGAChartData = {
        labels: Object.keys(cropsByLGA),
        datasets: [
            {
                label: "Number of Crops",
                data: Object.values(cropsByLGA),
                backgroundColor: "#36A2EB",
            },
        ],
    };
    // Chart Data for Crop Distribution
    const cropDistributionChartData = {
        labels: Object.keys(cropDistribution),
        datasets: [
            {
                label: "Crop Distribution",
                data: Object.values(cropDistribution),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4CAF50",
                    "#FF9F40",
                    "#9966FF",
                ],
            },
        ],
    };
    return (_jsxs("div", { className: "p-8 bg-gray-50 min-h-screen", children: [_jsx("h1", { className: "text-5xl font-extrabold text-center text-gray-800 mb-10", children: "Dashboard" }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-700 mb-6 text-center", children: "Companies by Category" }), _jsx("div", { className: "bg-white p-6 shadow-md rounded-md border border-gray-200", children: _jsx(Bar, { data: companiesChartData, options: { maintainAspectRatio: false }, height: 200 }) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-700 mb-6 text-center", children: "Markets by LGA" }), _jsx("div", { className: "bg-white p-6 shadow-md rounded-md border border-gray-200", children: _jsx(Bar, { data: marketsChartData, options: { maintainAspectRatio: false }, height: 200 }) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-700 mb-6 text-center", children: "Crops by LGA" }), _jsx("div", { className: "bg-white p-6 shadow-md rounded-md border border-gray-200", children: _jsx(Bar, { data: cropsByLGAChartData, options: { maintainAspectRatio: false }, height: 200 }) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-700 mb-6 text-center", children: "Crop Distribution" }), _jsx("div", { className: "bg-white p-6 shadow-md rounded-md border border-gray-200", children: _jsx(Pie, { data: cropDistributionChartData, options: { maintainAspectRatio: false }, height: 200 }) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-700 mb-6 text-center", children: "Market Details" }), _jsx("div", { className: "bg-white p-6 shadow-md rounded-md border border-gray-200 overflow-x-auto", children: _jsxs("table", { className: "table-auto w-full text-sm text-gray-800", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-200 text-gray-700", children: [_jsx("th", { className: "px-4 py-2 text-left", children: "Name" }), _jsx("th", { className: "px-4 py-2 text-left", children: "LGA" }), _jsx("th", { className: "px-4 py-2 text-left", children: "Operating Days" }), _jsx("th", { className: "px-4 py-2 text-left", children: "Description" }), _jsx("th", { className: "px-4 py-2 text-left", children: "Commodities" })] }) }), _jsx("tbody", { children: markets.map((market, index) => (_jsxs("tr", { className: `border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`, children: [_jsx("td", { className: "px-4 py-2", children: market.name }), _jsx("td", { className: "px-4 py-2", children: market.lga }), _jsx("td", { className: "px-4 py-2", children: market.operatingDays }), _jsx("td", { className: "px-4 py-2", children: market.description }), _jsx("td", { className: "px-4 py-2", children: market.commodities.join(", ") })] }, index))) })] }) })] }), _jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-700 mb-6 text-center", children: "LGA Crop Details" }), _jsx("div", { className: "bg-white p-6 shadow-md rounded-md border border-gray-200 overflow-x-auto", children: _jsxs("table", { className: "table-auto w-full text-sm text-gray-800", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-200 text-gray-700", children: [_jsx("th", { className: "px-4 py-2 text-left", children: "LGA" }), _jsx("th", { className: "px-4 py-2 text-left", children: "Crops" })] }) }), _jsx("tbody", { children: lgacrops.map((lga, index) => (_jsxs("tr", { className: `border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`, children: ["                                    ", _jsx("td", { className: "px-4 py-2", children: lga.lga }), _jsx("td", { className: "px-4 py-2", children: Array.isArray(lga.crops) ? lga.crops.join(", ") : 'N/A' })] }, index))) })] }) })] })] }));
};
export default Dashboard;
