import React from "react";
import { lgacrops } from "../data/lgacrops";
import markets from "../data/markets"; // Import markets data

interface SidebarProps {
    displayMode: string;
    setDisplayMode: (mode: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedCommodity: string;
    setSelectedCommodity: (commodity: string) => void;
    categories: string[];
    commodityTypes: string[];
    selectedCrop: string;
    setSelectedCrop: (crop: string) => void;
    selectedLgaCrops: { lga: string; crops: string[] } | null;
    selectedMarket: {
        name: string;
        lga: string;
        latitude: number;
        longitude: number;
        operatingDays: string;
        description: string;
        commodities: string[];
    } | null;
    selectedMarketCommodity: string;
    setSelectedMarketCommodity: (commodity: string) => void;
    selectedCompany: Company | null; // Add selectedCompany
}

const Sidebar: React.FC<SidebarProps & { selectedLgaCrops: { lga: string; crops: string[] } | null }> = ({
    displayMode,
    setDisplayMode,
    selectedCategory,
    setSelectedCategory,
    categories,
    selectedCommodity,
    setSelectedCommodity,
    commodityTypes,
    selectedCrop,
    setSelectedCrop,
    selectedLgaCrops, // Add selectedLgaCrops as a prop
    selectedMarket, // Add selectedMarket as a prop
    selectedMarketCommodity, // Add selectedMarketCommodity as a prop
    setSelectedMarketCommodity, // Add setSelectedMarketCommodity as a prop
    selectedCompany, // Add selectedCompany as a prop
}) => {
    return (
        <div className="sidebar w-1/6 p-4 bg-gray-800 shadow-lg border-r border-gray-700 flex flex-col space-y-4">
            {/* Display Mode Buttons */}
            <button
                className={`w-full px-3 py-1 rounded-md shadow-sm text-sm transition-all ${displayMode === "companies"
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                onClick={() => setDisplayMode("companies")}
            >
                🏢 Companies
            </button>
            <button
                className={`w-full px-3 py-1 rounded-md shadow-sm text-sm transition-all ${displayMode === "temperature"
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                onClick={() => setDisplayMode("temperature")}
            >
                🌡 Weather Report
            </button>
            <button
                className={`w-full px-3 py-1 rounded-md shadow-sm text-sm transition-all ${displayMode === "commodityPrices"
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                onClick={() => setDisplayMode("commodityPrices")}
            >
                📊 Commodity Prices
            </button>
            <button
                className={`w-full px-3 py-1 rounded-md shadow-sm text-sm transition-all ${displayMode === "crops"
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                onClick={() => setDisplayMode("crops")}
            >
                🌾 Crops
            </button>
            <button
                className={`w-full px-3 py-1 rounded-md shadow-sm text-sm transition-all ${displayMode === "markets"
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                onClick={() => setDisplayMode("markets")}
            >
                🏬 Major Markets
            </button>

            {/* Category Filter for Companies */}
            {displayMode === "companies" && (
                <div className="space-y-2">
                    <h3 className="text-md font-semibold text-gray-300">Filter by Category</h3>
                    <select
                        className="w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Commodity Filter */}
            {displayMode === "commodityPrices" && (
                <div className="space-y-2">
                    <h3 className="text-md font-semibold text-gray-300">Filter by Commodity</h3>
                    <select
                        className="w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        value={selectedCommodity}
                        onChange={(e) => setSelectedCommodity(e.target.value)}
                    >
                        {commodityTypes.map((commodity) => (
                            <option key={commodity} value={commodity}>
                                {commodity}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Crop Filter */}
            {displayMode === "crops" && (
                <div className="space-y-2">
                    <h3 className="text-md font-semibold text-gray-300">Filter by Crop</h3>
                    <select
                        className="w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                    >
                        <option value="All">All Crops</option>
                        {[...new Set(lgacrops.flatMap((lga) => lga.crops))].map((crop) => (
                            <option key={crop} value={crop}>
                                {crop}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Display Selected LGA and Crops */}
            {displayMode === "crops" && selectedLgaCrops && (
                <div className="mt-4 p-4 bg-gray-700 rounded-md shadow">
                    <h3 className="text-lg font-bold text-white">{selectedLgaCrops.lga}</h3>
                    <ul className="mt-2 text-sm text-gray-300">
                        {selectedLgaCrops.crops.map((crop, index) => (
                            <li key={index}>🌾 {crop}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Display Selected Market Details */}
            {displayMode === "markets" && selectedMarket && (
                <div className="mt-4 p-4 bg-gray-700 rounded-md shadow">
                    <h3 className="text-lg font-bold text-white">{selectedMarket.name}</h3>
                    <p className="text-sm text-gray-300">
                        <strong>LGA:</strong> {selectedMarket.lga}
                    </p>
                    <p className="text-sm text-gray-300">
                        <strong>Operating Days:</strong> {selectedMarket.operatingDays}
                    </p>
                    <p className="text-sm text-gray-300">
                        <strong>Description:</strong> {selectedMarket.description}
                    </p>
                    <p className="text-sm text-gray-300">
                        <strong>Commodities:</strong>
                    </p>
                    <ul className="mt-2 text-sm text-gray-300">
                        {selectedMarket.commodities.map((commodity, index) => (
                            <li key={index}>🌾 {commodity}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Commodity Filter for Markets */}
            {displayMode === "markets" && (
                <div className="space-y-2">
                    <h3 className="text-md font-semibold text-gray-300">Filter by Commodity</h3>
                    <select
                        className="w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        value={selectedMarketCommodity}
                        onChange={(e) => setSelectedMarketCommodity(e.target.value)}
                    >
                        <option value="All">All Commodities</option>
                        {[...new Set(markets.flatMap((market) => market.commodities))].map(
                            (commodity) => (
                                <option key={commodity} value={commodity}>
                                    {commodity}
                                </option>
                            )
                        )}
                    </select>
                </div>
            )}

            {/* Display Selected Company Details */}
            {displayMode === "companies" && selectedCompany && (
                <div className="mt-4 p-4 bg-gray-700 rounded-md shadow">
                    <h3 className="text-lg font-bold text-white">{selectedCompany.name}</h3>
                    <p className="text-sm text-gray-300">
                        <strong>Category:</strong> {selectedCompany.category}
                    </p>
                    <p className="text-sm text-gray-300">
                        <strong>Office Address:</strong> {selectedCompany.office_address}
                    </p>
                    <p className="text-sm text-gray-300">
                        <strong>Contact Person:</strong> {selectedCompany.contact_person}
                    </p>
                    <p className="text-sm text-gray-300">
                        <strong>Phone Number:</strong> {selectedCompany.phone_number}
                    </p>
                    <p className="text-sm text-gray-300">
                        <strong>Email/Website:</strong> {selectedCompany.email_website}
                    </p>
                    <p className="text-sm text-gray-300">
                        <strong>Commodities:</strong> {selectedCompany.commodity.join(", ")}
                    </p>
                </div>
            )}
        </div>
    );
};
export default Sidebar;