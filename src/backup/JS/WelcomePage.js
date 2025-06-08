import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar, Line } from 'react-chartjs-2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);
const topCropsData = {
    labels: ['Ginger', 'Maize', 'Soybeans', 'Tomatoes', 'Grapes'],
    datasets: [
        {
            label: 'National Production Share (%)',
            data: [76.4, 65, 45, 38, 85],
            backgroundColor: '#22c55e',
            borderRadius: 8,
        }
    ]
};
const productionTrendData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
        {
            label: 'Agricultural GDP (Trillion ₦)',
            data: [2.1, 2.3, 2.5, 2.8, 3.1],
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            fill: true,
            tension: 0.4,
        }
    ]
};
const nationalRankingData = {
    labels: ['Ginger', 'Maize', 'Soybeans', 'Tomatoes', 'Grapes'],
    datasets: [
        {
            label: 'National Ranking',
            data: [1, 1, 2, 3, 1],
            backgroundColor: ['#22c55e', '#15803d', '#166534', '#14532d', '#052e16'],
            borderRadius: 8,
        }
    ]
};
const WelcomeMessage = () => {
    return (_jsxs("div", { className: "bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-3xl font-bold text-green-800", children: "Kaduna State Agricultural Dashboard" }), _jsx("p", { className: "text-lg text-gray-600", children: "Leading Nigeria's agricultural transformation in maize, ginger, and soybeans production" })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-4xl font-bold text-green-600", children: "\u20A63.1T" }), _jsx("div", { className: "text-sm text-gray-600", children: "Agricultural GDP (2024)" })] })] }), _jsxs("div", { className: "grid grid-cols-4 gap-4 mt-6", children: [_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: "No. 1" }), _jsx("div", { className: "text-sm text-gray-600", children: "National Ginger Production" })] }), _jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: "No. 1" }), _jsx("div", { className: "text-sm text-gray-600", children: "In Maize Production" })] }), _jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: "No. 1" }), _jsx("div", { className: "text-sm text-gray-600", children: "Of National Grape Production" })] }), _jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: "No. 2" }), _jsx("div", { className: "text-sm text-gray-600", children: "In Soybean Production" })] })] })] }));
};
const newsAndEvents = [
    {
        title: "Kaduna Maintains Lead in Ginger Production",
        date: "May 15, 2025",
        description: "Kaduna State continues to dominate Nigeria's ginger production with 76.4% of national output, strengthening its position in the global ginger market."
    },
    {
        title: "Kudan LGA Grape Production Success",
        date: "May 12, 2025",
        description: "Kudan Local Government achieves remarkable 85% contribution to national grape production, setting new benchmarks in fruit farming."
    },
    {
        title: "Maize Production Excellence Award",
        date: "May 10, 2025",
        description: "Kaduna State recognized as Nigeria's leading maize producer, contributing significantly to national food security."
    },
    {
        title: "Soybean Cultivation Enhancement Program",
        date: "May 8, 2025",
        description: "New initiative launched to strengthen Kaduna's position as the second-largest soybean producer in Nigeria through advanced farming techniques."
    },
    {
        title: "Tomato Value Chain Development",
        date: "May 5, 2025",
        description: "State government announces comprehensive plan to boost tomato production and processing, building on current position as third-largest producer."
    }
];
const Homepage = () => {
    return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "container mx-auto p-4 space-y-8", children: [_jsx(WelcomeMessage, {}), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: ["                        ", _jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "Top Crops Production Share" }), _jsx(Bar, { data: topCropsData, options: {
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                display: false
                                            },
                                            title: {
                                                display: true,
                                                text: 'National Production Share % (2024)'
                                            }
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                max: 100,
                                                ticks: {
                                                    callback: (value) => `${value}%`
                                                }
                                            }
                                        }
                                    } })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "Agricultural Growth" }), _jsx(Line, { data: productionTrendData, options: {
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                display: false
                                            },
                                            title: {
                                                display: true,
                                                text: '5-Year Agricultural GDP Trend'
                                            }
                                        }
                                    } })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "National Rankings" }), _jsx(Bar, { data: nationalRankingData, options: {
                                        responsive: true,
                                        indexAxis: 'y',
                                        plugins: {
                                            legend: {
                                                display: false
                                            },
                                            title: {
                                                display: true,
                                                text: 'Crop Rankings Nationally'
                                            }
                                        },
                                        scales: {
                                            x: {
                                                max: 10,
                                                ticks: {
                                                    stepSize: 1
                                                }
                                            }
                                        }
                                    } })] }), _jsxs("div", { className: "col-span-3 bg-white rounded-lg shadow-lg p-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "Latest Updates" }), _jsx(Swiper, { modules: [Navigation, Pagination, Autoplay], spaceBetween: 30, slidesPerView: 1, navigation: true, pagination: { clickable: true }, autoplay: { delay: 5000, disableOnInteraction: false }, className: "h-[300px]", children: newsAndEvents.map((item, index) => (_jsx(SwiperSlide, { children: _jsxs("div", { className: "bg-green-50 rounded-lg p-6 h-full", children: [_jsx("div", { className: "text-sm text-green-600 mb-2", children: item.date }), _jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-3", children: item.title }), _jsx("p", { className: "text-gray-600", children: item.description })] }) }, index))) })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "Quick Access" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [_jsxs("a", { href: "/seasonal-farming-tips", className: "flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors", children: [_jsx("span", { className: "material-icons text-3xl text-green-600 mb-2", children: "eco" }), _jsx("span", { className: "text-gray-700", children: "Seasonal Farming Tips" })] }), _jsxs("a", { href: "/precision-farming", className: "flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors", children: [_jsx("span", { className: "material-icons text-3xl text-green-600 mb-2", children: "precision_manufacturing" }), _jsx("span", { className: "text-gray-700", children: "Precision Farming" })] }), _jsxs("a", { href: "/market", className: "flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors", children: [_jsx("span", { className: "material-icons text-3xl text-green-600 mb-2", children: "trending_up" }), _jsx("span", { className: "text-gray-700", children: "Market Information" })] }), _jsxs("a", { href: "/weather", className: "flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors", children: [_jsx("span", { className: "material-icons text-3xl text-green-600 mb-2", children: "wb_sunny" }), _jsx("span", { className: "text-gray-700", children: "Weather Updates" })] })] })] })] }) }));
};
export default Homepage;
