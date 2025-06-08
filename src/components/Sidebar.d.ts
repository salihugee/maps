import React from "react";
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
    selectedLgaCrops: {
        lga: string;
        crops: string[];
    } | null;
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
    selectedCompany: Company | null;
}
declare const Sidebar: React.FC<SidebarProps & {
    selectedLgaCrops: {
        lga: string;
        crops: string[];
    } | null;
}>;
export default Sidebar;
