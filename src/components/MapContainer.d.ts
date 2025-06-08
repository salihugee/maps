import React from "react";
interface MapContainerProps {
    displayMode: string;
    showIrrigationSchemes: boolean;
    setShowIrrigationSchemes: (enabled: boolean) => void;
    irrigationSchemes: {
        name: string;
        lga: string;
        location: string;
        size: string;
        coordinates: [number, number];
    }[];
    filteredCommodityPrices: {
        lga: string;
        commodity: string;
        price: number;
    }[];
    filteredMarkets: {
        name: string;
        lga: string;
        latitude: number;
        longitude: number;
        operatingDays: string;
        description: string;
        commodities: string[];
    }[];
    filteredCompanies: {
        id: string;
        name: string;
        category: string;
        coordinates: [number, number];
    }[];
    lgas: {
        name: string;
        coordinates: [number, number];
    }[];
    temperatures: {
        [key: string]: number | null;
    };
    selectedCrop: string;
    lgacrops: {
        lga: string;
        crops: string[];
        coordinates: [number, number];
    }[];
    selectedCompany: {
        id: string;
        name: string;
        category: string;
        coordinates: [number, number];
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
    isClusteringEnabled: boolean;
    setIsClusteringEnabled: (enabled: boolean) => void;
    customIcon: L.Icon;
    irrigationIcon: L.Icon;
    marketIcon: L.Icon;
    cropIcons: {
        [key: string]: L.Icon;
    };
    categoryIcons: {
        [key: string]: L.Icon;
    };
    createClusterCustomIcon: (cluster: any) => L.DivIcon;
    setSelectedCompany: (company: any) => void;
    setSelectedMarket: (market: any) => void;
    setSelectedLgaCrops: (lgaCrops: any) => void;
    setSelectedIrrigationScheme: (scheme: any) => void;
}
declare const MapContainerComponent: React.FC<MapContainerProps>;
export default MapContainerComponent;
