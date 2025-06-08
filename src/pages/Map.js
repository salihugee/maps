import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, LayersControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { lgas } from "../data/lgas";
import { getWeatherData } from "../services/weather";
import { getCompanies } from "../services/api";
import { commodityPrices } from "../data/commodity";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { irrigationSchemes } from "../data/irrigationSchemes";
import { lgacrops } from "../data/lgacrops";
import markets from "../data/markets";
import Sidebar from "../components/Sidebar";
import IrrigationSchemesToggleControl from "../components/IrrigationSchemes";
import "leaflet-plugins/layer/vector/KML"; // <-- This enables L.KML
// import { Company } from "../types";
// Custom Control Component for Clustering Toggle
const ClusteringToggleControl = ({ isClusteringEnabled, setIsClusteringEnabled }) => {
    const map = useMap();
    useEffect(() => {
        const controlDiv = L.DomUtil.create("div", "leaflet-control leaflet-bar");
        controlDiv.style.background = "white";
        controlDiv.style.padding = "10px";
        controlDiv.style.borderRadius = "8px";
        controlDiv.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";
        controlDiv.style.fontFamily = "Arial, sans-serif";
        controlDiv.style.fontSize = "14px";
        controlDiv.style.color = "#333";
        const label = L.DomUtil.create("label", "", controlDiv);
        label.style.display = "flex";
        label.style.alignItems = "center";
        label.style.gap = "8px";
        const checkbox = L.DomUtil.create("input", "", label);
        checkbox.type = "checkbox";
        checkbox.checked = isClusteringEnabled;
        checkbox.style.width = "16px";
        checkbox.style.height = "16px";
        checkbox.style.cursor = "pointer";
        checkbox.onchange = () => setIsClusteringEnabled(checkbox.checked);
        const text = L.DomUtil.create("span", "", label);
        text.innerText = "Enable Clustering";
        text.style.color = "#333"; // Ensure text is visible
        text.style.cursor = "pointer";
        const customControl = new L.Control({ position: "topright" });
        customControl.onAdd = () => controlDiv;
        customControl.addTo(map);
        return () => {
            customControl.remove();
        };
    }, [isClusteringEnabled, setIsClusteringEnabled, map]);
    return null;
};
// Function to load and add KML layer
const AddKmlLayer = () => {
    const map = useMap();
    useEffect(() => {
        const fetchKml = async () => {
            try {
                const response = await fetch("/kaduna.kml"); // File in public/
                const kmlText = await response.text();
                const parser = new DOMParser();
                const kml = parser.parseFromString(kmlText, "text/xml");
                const kmlLayer = new L.KML(kml);
                map.addLayer(kmlLayer);
                map.fitBounds(kmlLayer.getBounds());
            }
            catch (err) {
                console.error("Failed to load KML:", err);
            }
        };
        fetchKml();
    }, [map]);
    return null;
};
const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [15, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
// Define custom icons for each category
const categoryIcons = {
    "Contract Farming": L.icon({
        iconUrl: "/icons/contract.png", // Replace with the actual path to your icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    "Fertilizer Company": L.icon({
        iconUrl: "/icons/fert.png", // Replace with the actual path to your icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    "Seeds Company": L.icon({
        iconUrl: "/icons/seed.png", // Replace with the actual path to your icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    Processors: L.icon({
        iconUrl: "/icons/processor.png", // Replace with the actual path to your icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    Aggregator: L.icon({
        iconUrl: "/icons/aggregator.png", // Replace with the actual path to your icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    Mechanization: L.icon({
        iconUrl: "/icons/mech.png", // Replace with the actual path to your icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    Default: L.icon({
        iconUrl: "/icons/fert.png", // Replace with the actual path to your default icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
};
const irrigationIcon = L.icon({
    iconUrl: "/icons/irrigation.png", // Replace with the actual path to your irrigation icon
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});
const cropIcons = {
    Maize: L.icon({
        iconUrl: "/icons/maize.png", // Replace with the actual path to your maize icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    Rice: L.icon({
        iconUrl: "/icons/rice.png", // Replace with the actual path to your rice icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    Groundnut: L.icon({
        iconUrl: "/icons/groundnut.png", // Replace with the actual path to your groundnut icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    Soybean: L.icon({
        iconUrl: "/icons/soybean.png", // Replace with the actual path to your soybean icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    Sorghum: L.icon({
        iconUrl: "/icons/sorghum.png", // Replace with the actual path to your sorghum icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    Default: L.icon({
        iconUrl: "/icons/default.png", // Replace with the actual path to your default icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
};
const marketIcon = L.icon({
    iconUrl: "/icons/market.png", // Replace with the actual path to your market icon
    iconSize: [32, 32], // Adjust the size of the icon
    iconAnchor: [16, 32], // Anchor the icon to the correct position
    popupAnchor: [0, -32], // Position the popup relative to the icon
});
const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount();
    return L.divIcon({
        html: `
      <div style="
        background-color: #4CAF50; 
        color: white; 
        border-radius: 50%; 
        width: 40px; 
        height: 40px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 14px; 
        font-weight: bold;
      ">
        ${count}
      </div>`,
        className: "custom-cluster-icon",
        iconSize: [40, 40],
    });
};
const CenterMapOnClick = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom(), { animate: true });
        }
    }, [position, map]);
    return null;
};
const Map = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;
    // Fetch companies data from the server with retry logic
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getCompanies();
                if (!data || data.length === 0) {
                    throw new Error('No companies data available');
                }
                // Validate company data
                const validCompanies = data.filter(company => {
                    if (!company.coordinates || !Array.isArray(company.coordinates) || company.coordinates.length !== 2) {
                        console.warn(`Invalid coordinates for company: ${company.name}`);
                        return false;
                    }
                    return true;
                });
                // Convert id to number to match local Company interface
                const normalizedCompanies = validCompanies.map(company => ({
                    ...company,
                    id: typeof company.id === "string" ? parseInt(company.id, 10) : company.id,
                }));
                setCompanies(normalizedCompanies);
                setError(null);
            }
            catch (error) {
                console.error("Error fetching companies:", error);
                const errorMessage = error instanceof Error ? error.message : 'Failed to fetch companies data';
                setError(errorMessage);
                // Implement retry logic
                if (retryCount < maxRetries) {
                    setTimeout(() => {
                        setRetryCount(prev => prev + 1);
                    }, 2000 * Math.pow(2, retryCount)); // Exponential backoff
                }
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchCompanies();
    }, [retryCount]); // Add retryCount as dependency
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedCommodity, setSelectedCommodity] = useState("All");
    const [temperatures, setTemperatures] = useState({});
    const [displayMode, setDisplayMode] = useState("companies");
    const [isClusteringEnabled, setIsClusteringEnabled] = useState(false);
    const [showIrrigationSchemes, setShowIrrigationSchemes] = useState(true);
    const [selectedIrrigationScheme, setSelectedIrrigationScheme] = useState(null);
    const [selectedCrop, setSelectedCrop] = useState("All");
    const [selectedLgaCrops, setSelectedLgaCrops] = useState(null);
    const [selectedMarket, setSelectedMarket] = useState(null); // New state for selected market
    const [selectedMarketCommodity, setSelectedMarketCommodity] = useState("All");
    const [selectedCompany, setSelectedCompany] = useState(null); // New state for selected company
    const categories = ["All", ...new Set(companies.map((c) => c.category))];
    const commodityTypes = ["All", ...new Set(commodityPrices.map((c) => c.commodity))];
    const filteredCompanies = selectedCategory === "All"
        ? companies
        : companies.filter((c) => c.category === selectedCategory);
    const filteredCommodityPrices = selectedCommodity === "All"
        ? commodityPrices
        : commodityPrices.filter((c) => c.commodity === selectedCommodity);
    const filteredMarkets = selectedMarketCommodity === "All"
        ? markets
        : markets.filter((market) => market.commodities.includes(selectedMarketCommodity));
    useEffect(() => {
        if (displayMode === "temperature") {
            const fetchAllTemperatures = async () => {
                const tempData = {};
                for (const lga of lgas) {
                    const temp = await getWeatherData(lga.coordinates[0], lga.coordinates[1]);
                    tempData[lga.name] = temp;
                }
                setTemperatures(tempData);
            };
            fetchAllTemperatures();
        }
    }, [displayMode]);
    return (_jsxs("div", { className: "flex h-screen w-screen bg-gray-100", children: [_jsx(Sidebar, { displayMode: displayMode, setDisplayMode: setDisplayMode, selectedCategory: selectedCategory, setSelectedCategory: setSelectedCategory, categories: categories, selectedCommodity: selectedCommodity, setSelectedCommodity: setSelectedCommodity, commodityTypes: commodityTypes, selectedCrop: selectedCrop, setSelectedCrop: setSelectedCrop, selectedLgaCrops: selectedLgaCrops, selectedMarket: selectedMarket, selectedMarketCommodity: selectedMarketCommodity, setSelectedMarketCommodity: setSelectedMarketCommodity, selectedCompany: selectedCompany }), error && (_jsxs("div", { className: "absolute top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-[9999]", role: "alert", children: [_jsx("span", { className: "font-bold", children: "Error:" }), " ", error] })), isLoading && (_jsxs("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-[9999]", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" }), _jsx("p", { className: "mt-2 text-gray-700", children: "Loading data..." })] })), _jsxs(MapContainer, { center: [10.3764, 7.7095], zoom: 9, style: { height: "100%", width: "85%" }, scrollWheelZoom: true, className: "shadow-lg rounded-lg", children: [_jsxs(LayersControl, { position: "topright", children: [_jsx(LayersControl.BaseLayer, { checked: true, name: "Street View", children: _jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }) }), _jsx(LayersControl.BaseLayer, { name: "Satellite View", children: _jsx(TileLayer, { url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" }) })] }), _jsx(AddKmlLayer, {}), displayMode === "companies" && (_jsx(IrrigationSchemesToggleControl, { showIrrigationSchemes: showIrrigationSchemes, setShowIrrigationSchemes: setShowIrrigationSchemes })), displayMode === "companies" &&
                        showIrrigationSchemes &&
                        irrigationSchemes.map((scheme, index) => (_jsx(Marker, { position: scheme.coordinates, icon: irrigationIcon, eventHandlers: {
                                click: () => {
                                    setSelectedIrrigationScheme({
                                        name: scheme.name,
                                        coordinates: scheme.coordinates,
                                    });
                                },
                            }, children: _jsxs(Popup, { children: [_jsx("h3", { className: "text-lg font-bold", children: scheme.name }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "LGA:" }), " ", scheme.lga] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Location:" }), " ", scheme.location] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Size:" }), " ", scheme.size] })] }) }, index))), displayMode === "commodityPrices" &&
                        filteredCommodityPrices.map((item) => {
                            const lga = lgas.find((l) => l.name === item.lga);
                            return (lga && (_jsx(Marker, { position: lga.coordinates, icon: customIcon, children: _jsxs(Popup, { children: [_jsx("h3", { className: "text-lg font-bold", children: lga.name }), _jsxs("p", { className: "text-sm text-gray-700", children: [item.commodity, ":", " ", _jsxs("span", { className: "font-bold", children: ["\u20A6", item.price.toLocaleString()] })] })] }) }, `${item.lga}-${item.commodity}`)));
                        }), displayMode === "crops" &&
                        lgacrops
                            .filter((lga) => selectedCrop === "All" || lga.crops.includes(selectedCrop))
                            .map((lga) => lga.crops.map((crop, index) => (_jsx(Marker, { position: lga.coordinates, icon: cropIcons[crop] || cropIcons.Default, eventHandlers: {
                                click: () => {
                                    setSelectedLgaCrops({ lga: lga.lga, crops: lga.crops });
                                },
                            }, children: _jsxs(Popup, { children: [_jsx("h3", { className: "text-lg font-bold", children: lga.lga }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Crop:" }), " ", crop] })] }) }, `${lga.lga}-${crop}-${index}`)))), displayMode === "companies" && (isClusteringEnabled ? (_jsx(MarkerClusterGroup, { showCoverageOnHover: false, chunkedLoading: true, maxClusterRadius: 40, disableClusteringAtZoom: 18, animate: true, iconCreateFunction: (cluster) => createClusterCustomIcon(cluster), children: filteredCompanies.map((company) => (_jsx(Marker, { position: company.coordinates, icon: categoryIcons[company.category] || categoryIcons.Default, eventHandlers: {
                                click: () => setSelectedCompany(company),
                            }, children: _jsx(Tooltip, { permanent: true, direction: "top", offset: [0, -20], className: "bg-white text-black p-2", children: _jsx("strong", { className: "font-bold", children: company.name }) }) }, company.id))) })) : (filteredCompanies.map((company) => (_jsx(Marker, { position: company.coordinates, icon: categoryIcons[company.category] || categoryIcons.Default, eventHandlers: {
                            click: () => setSelectedCompany(company),
                        }, children: _jsx(Tooltip, { permanent: true, direction: "top", offset: [0, -20], className: "bg-white text-black p-2", children: _jsx("strong", { className: "font-bold", children: company.name }) }) }, company.id))))), displayMode === "temperature" &&
                        lgas.map((lga) => (_jsxs(Marker, { position: lga.coordinates, icon: customIcon, children: [_jsxs(Tooltip, { permanent: true, direction: "top", offset: [0, -20], className: "bg-white text-black p-2 rounded-md shadow", children: [_jsx("strong", { className: "text-sm text-gray-700", children: temperatures[lga.name] !== null
                                                ? `${temperatures[lga.name]}°C`
                                                : "Loading..." }), _jsx("p", { children: lga.name })] }), _jsxs(Popup, { children: [_jsx("h3", { className: "text-lg font-bold", children: lga.name }), _jsxs("p", { className: "text-sm text-gray-700", children: ["Temperature:", " ", temperatures[lga.name] !== null
                                                    ? `${temperatures[lga.name]}°C`
                                                    : "Loading..."] })] })] }, lga.name))), displayMode === "markets" &&
                        filteredMarkets.map((market, index) => (_jsxs(Marker, { position: [market.latitude, market.longitude], icon: marketIcon, eventHandlers: {
                                click: () => {
                                    setSelectedMarket(market); // Set the selected market when marker is clicked
                                },
                            }, children: [_jsx(Tooltip, { permanent: true, direction: "top", offset: [0, -20], className: "bg-white text-black p-2", children: _jsx("strong", { className: "font-bold", children: market.name }) }), _jsxs(Popup, { children: [_jsx("h3", { className: "text-lg font-bold", children: market.name }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "LGA:" }), " ", market.lga] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Operating Days:" }), " ", market.operatingDays] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Description:" }), " ", market.description] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Commodities:" }), " ", market.commodities.join(", ")] })] })] }, index))), _jsx(ClusteringToggleControl, { isClusteringEnabled: isClusteringEnabled, setIsClusteringEnabled: setIsClusteringEnabled }), selectedCompany && _jsx(CenterMapOnClick, { position: selectedCompany.coordinates }), selectedIrrigationScheme && (_jsx(CenterMapOnClick, { position: selectedIrrigationScheme.coordinates })), selectedMarket && (_jsx(CenterMapOnClick, { position: [selectedMarket.latitude, selectedMarket.longitude] })), selectedMarket && (_jsx("div", { children: "Content" }))] })] }));
};
export default Map;
