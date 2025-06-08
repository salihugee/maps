import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, LayersControl, } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import IrrigationSchemesToggleControl from "./IrrigationSchemes";
import CenterMapOnClick from "./CenterMapOnClick";
const MapContainerComponent = ({ displayMode, showIrrigationSchemes, setShowIrrigationSchemes, irrigationSchemes, filteredCommodityPrices, filteredMarkets, filteredCompanies, lgas, temperatures, selectedCrop, lgacrops, selectedCompany, selectedMarket, isClusteringEnabled, setIsClusteringEnabled, customIcon, irrigationIcon, marketIcon, cropIcons, categoryIcons, createClusterCustomIcon, setSelectedCompany, setSelectedMarket, setSelectedLgaCrops, setSelectedIrrigationScheme, }) => {
    return (_jsxs(MapContainer, { center: [10.3764, 7.7095], zoom: 9, style: { height: "100%", width: "85%" }, scrollWheelZoom: true, className: "shadow-lg rounded-lg", children: [_jsxs(LayersControl, { position: "topright", children: [_jsx(LayersControl.BaseLayer, { checked: true, name: "Street View", children: _jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }) }), _jsx(LayersControl.BaseLayer, { name: "Satellite View", children: _jsx(TileLayer, { url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" }) })] }), displayMode === "companies" && (_jsx(IrrigationSchemesToggleControl, { showIrrigationSchemes: showIrrigationSchemes, setShowIrrigationSchemes: setShowIrrigationSchemes })), displayMode === "companies" &&
                showIrrigationSchemes &&
                irrigationSchemes.map((scheme, index) => (_jsx(Marker, { position: scheme.coordinates, icon: irrigationIcon, eventHandlers: {
                        click: () => {
                            setSelectedIrrigationScheme({
                                name: scheme.name,
                                coordinates: scheme.coordinates,
                            });
                        },
                    }, children: _jsxs(Popup, { children: [_jsx("h3", { className: "text-lg font-bold", children: scheme.name }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "LGA:" }), " ", scheme.lga] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Location:" }), " ", scheme.location] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Size:" }), " ", scheme.size] })] }) }, index))), displayMode === "companies" && (isClusteringEnabled ? (_jsx(MarkerClusterGroup, { showCoverageOnHover: false, iconCreateFunction: createClusterCustomIcon, children: filteredCompanies.map((company) => (_jsx(Marker, { position: company.coordinates, icon: categoryIcons[company.category] || categoryIcons.Default, eventHandlers: {
                        click: () => setSelectedCompany(company),
                    }, children: _jsx(Tooltip, { permanent: true, direction: "top", offset: [0, -20], className: "bg-white text-black p-2", children: _jsx("strong", { className: "font-bold", children: company.name }) }) }, company.id))) })) : (filteredCompanies.map((company) => (_jsx(Marker, { position: company.coordinates, icon: categoryIcons[company.category] || categoryIcons.Default, eventHandlers: {
                    click: () => setSelectedCompany(company),
                }, children: _jsx(Tooltip, { permanent: true, direction: "top", offset: [0, -20], className: "bg-white text-black p-2", children: _jsx("strong", { className: "font-bold", children: company.name }) }) }, company.id))))), displayMode === "temperature" &&
                lgas.map((lga) => (_jsx(Marker, { position: lga.coordinates, icon: customIcon, children: _jsxs(Tooltip, { permanent: true, direction: "top", offset: [0, -20], className: "bg-white text-black p-2 rounded-md shadow", children: [_jsx("strong", { className: "text-sm text-gray-700", children: temperatures[lga.name] !== null
                                    ? `${temperatures[lga.name]}°C`
                                    : "Loading..." }), _jsx("p", { children: lga.name })] }) }, lga.name))), displayMode === "markets" &&
                filteredMarkets.map((market, index) => (_jsx(Marker, { position: [market.latitude, market.longitude], icon: marketIcon, eventHandlers: {
                        click: () => setSelectedMarket(market),
                    }, children: _jsxs(Popup, { children: [_jsx("h3", { className: "text-lg font-bold", children: market.name }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "LGA:" }), " ", market.lga] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Operating Days:" }), " ", market.operatingDays] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Description:" }), " ", market.description] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Commodities:" }), " ", market.commodities.join(", ")] })] }) }, index))), _jsx(ClusteringToggleControl, { isClusteringEnabled: isClusteringEnabled, setIsClusteringEnabled: setIsClusteringEnabled }), selectedCompany && (_jsx(CenterMapOnClick, { position: selectedCompany.coordinates })), selectedMarket && (_jsx(CenterMapOnClick, { position: [selectedMarket.latitude, selectedMarket.longitude] }))] }));
};
export default MapContainerComponent;
