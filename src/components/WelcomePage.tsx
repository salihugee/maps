import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

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

const WelcomeMessage: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-green-800">Kaduna State Agricultural Dashboard</h2>
                    <p className="text-lg text-gray-600">
                        Leading Nigeria's agricultural transformation in maize, ginger, and soybeans production
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold text-green-600">₦3.1T</div>
                    <div className="text-sm text-gray-600">Agricultural GDP (2024)</div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">No. 1</div>
                    <div className="text-sm text-gray-600">National Ginger Production</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">No. 1</div>
                    <div className="text-sm text-gray-600">In Maize Production</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">No. 1</div>
                    <div className="text-sm text-gray-600">Of National Grape Production</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">No. 2</div>
                    <div className="text-sm text-gray-600">In Soybean Production</div>
                </div>
            </div>
        </div>
    );
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

const Homepage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-4 space-y-8">
             
                {/* Welcome Message Component */}
                <WelcomeMessage />
                
                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Top Crops Production */}
                    <div className="bg-white rounded-lg shadow-lg p-6">                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Top Crops Production Share
                        </h2>
                        <Bar data={topCropsData} options={{
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
                        }} />
                    </div>

                    {/* Agricultural Growth Trend */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Agricultural Growth
                        </h2>
                        <Line data={productionTrendData} options={{
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
                        }} />
                    </div>

                    {/* National Rankings */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            National Rankings
                        </h2>
                        <Bar data={nationalRankingData} options={{
                            responsive: true,
                            indexAxis: 'y' as const,
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
                        }} />
                    </div>

                    {/* News and Events Slider */}
                    <div className="col-span-3 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Latest Updates
                        </h2>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            className="h-[300px]"
                        >
                            {newsAndEvents.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="bg-green-50 rounded-lg p-6 h-full">
                                        <div className="text-sm text-green-600 mb-2">{item.date}</div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Quick Access
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <a href="/seasonal-farming-tips" 
                           className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                            <span className="material-icons text-3xl text-green-600 mb-2">eco</span>
                            <span className="text-gray-700">Seasonal Farming Tips</span>
                        </a>
                        <a href="/precision-farming" 
                           className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                            <span className="material-icons text-3xl text-green-600 mb-2">precision_manufacturing</span>
                            <span className="text-gray-700">Precision Farming</span>
                        </a>
                        <a href="/market" 
                           className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                            <span className="material-icons text-3xl text-green-600 mb-2">trending_up</span>
                            <span className="text-gray-700">Market Information</span>
                        </a>
                        <a href="/weather" 
                           className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                            <span className="material-icons text-3xl text-green-600 mb-2">wb_sunny</span>
                            <span className="text-gray-700">Weather Updates</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
