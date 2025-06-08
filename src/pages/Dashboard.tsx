import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { markets } from "../data/markets";
import { Company } from "../types";

interface LGACrops {
    lga: string;
    coordinates: [number, number];
    crops: string[];
}
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [lgacrops, setLgacrops] = useState<LGACrops[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {                const API_URL = import.meta.env.VITE_API_URL;
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
                        typeof lga.crops === 'string' ? lga.crops.split(',').map((c: string) => c.trim()) :
                        []
                }));                setCompanies(companiesData);
                setLgacrops(formattedLgaCrops);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    }    // Log data before processing
    console.log('Processing companies:', companies);
    console.log('Processing lgacrops:', lgacrops);

    // Summarize Companies by Category
    const companiesByCategory = companies.reduce((acc, company) => {
        console.log('Processing company:', company);
        if (company && company.category) {
            acc[company.category] = (acc[company.category] || 0) + 1;
        }
        return acc;
    }, {} as { [key: string]: number });

    console.log('Companies by category:', companiesByCategory);

    // Summarize Markets by LGA
    const marketsByLGA = markets.reduce((acc, market) => {
        acc[market.lga] = (acc[market.lga] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });    // Summarize Crops by LGA
    const cropsByLGA = lgacrops.reduce((acc, lga) => {
        console.log('Processing LGA:', lga);
        if (lga && lga.lga && Array.isArray(lga.crops)) {
            acc[lga.lga] = lga.crops.length;
        }
        return acc;
    }, {} as { [key: string]: number });

    console.log('Crops by LGA:', cropsByLGA);

    // Summarize Crop Distribution
    const cropDistribution = lgacrops.reduce((acc, lga) => {
        lga.crops.forEach((crop) => {
            acc[crop] = (acc[crop] || 0) + 1;
        });
        return acc;
    }, {} as { [key: string]: number });

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

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">
                Dashboard
            </h1>

            {/* Companies by Category */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                    Companies by Category
                </h2>
                <div className="bg-white p-6 shadow-md rounded-md border border-gray-200">
                    <Bar data={companiesChartData} options={{ maintainAspectRatio: false }} height={200} />
                </div>
            </div>

            {/* Markets by LGA */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                    Markets by LGA
                </h2>
                <div className="bg-white p-6 shadow-md rounded-md border border-gray-200">
                    <Bar data={marketsChartData} options={{ maintainAspectRatio: false }} height={200} />
                </div>
            </div>

            {/* Crops by LGA */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                    Crops by LGA
                </h2>
                <div className="bg-white p-6 shadow-md rounded-md border border-gray-200">
                    <Bar data={cropsByLGAChartData} options={{ maintainAspectRatio: false }} height={200} />
                </div>
            </div>

            {/* Crop Distribution */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                    Crop Distribution
                </h2>
                <div className="bg-white p-6 shadow-md rounded-md border border-gray-200">
                    <Pie data={cropDistributionChartData} options={{ maintainAspectRatio: false }} height={200} />
                </div>
            </div>

            {/* Table for Markets */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                    Market Details
                </h2>
                <div className="bg-white p-6 shadow-md rounded-md border border-gray-200 overflow-x-auto">
                    <table className="table-auto w-full text-sm text-gray-800">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">LGA</th>
                                <th className="px-4 py-2 text-left">Operating Days</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-left">Commodities</th>
                            </tr>
                        </thead>
                        <tbody>
                            {markets.map((market, index) => (
                                <tr
                                    key={index}
                                    className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                >
                                    <td className="px-4 py-2">{market.name}</td>
                                    <td className="px-4 py-2">{market.lga}</td>
                                    <td className="px-4 py-2">{market.operatingDays}</td>
                                    <td className="px-4 py-2">{market.description}</td>
                                    <td className="px-4 py-2">{market.commodities.join(", ")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Table for LGAs with Crops */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                    LGA Crop Details
                </h2>
                <div className="bg-white p-6 shadow-md rounded-md border border-gray-200 overflow-x-auto">
                    <table className="table-auto w-full text-sm text-gray-800">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="px-4 py-2 text-left">LGA</th>
                                <th className="px-4 py-2 text-left">Crops</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lgacrops.map((lga, index) => (
                                <tr
                                    key={index}
                                    className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                >                                    <td className="px-4 py-2">{lga.lga}</td>
                                    
                                    <td className="px-4 py-2">{Array.isArray(lga.crops) ? lga.crops.join(", ") : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;