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
import type { MarkerCluster } from "leaflet";
// import { Company } from "../types";

// Custom Control Component for Clustering Toggle
const ClusteringToggleControl: React.FC<{
  isClusteringEnabled: boolean;
  setIsClusteringEnabled: (enabled: boolean) => void;
}> = ({ isClusteringEnabled, setIsClusteringEnabled }) => {
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

    const checkbox = L.DomUtil.create("input", "", label) as HTMLInputElement;
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
      } catch (err) {
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
const categoryIcons: { [key: string]: L.Icon } = {
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

const cropIcons: { [key: string]: L.Icon } = {
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

const createClusterCustomIcon = (cluster: MarkerCluster) => {
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

const CenterMapOnClick: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);

  return null;
};

const Map = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      } catch (error) {
        console.error("Error fetching companies:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch companies data';
        setError(errorMessage);
        
        // Implement retry logic
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000 * Math.pow(2, retryCount)); // Exponential backoff
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [retryCount]); // Add retryCount as dependency

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCommodity, setSelectedCommodity] = useState("All");
  const [temperatures, setTemperatures] = useState<{ [key: string]: number | null }>({});
  const [displayMode, setDisplayMode] = useState<string>("companies");
  const [isClusteringEnabled, setIsClusteringEnabled] = useState(false);
  const [showIrrigationSchemes, setShowIrrigationSchemes] = useState(true);
  const [selectedIrrigationScheme, setSelectedIrrigationScheme] = useState<{
    name: string;
    coordinates: [number, number];
  } | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>("All");
  const [selectedLgaCrops, setSelectedLgaCrops] = useState<{
    lga: string;
    crops: string[];
  } | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<{
    name: string;
    lga: string;
    latitude: number;
    longitude: number;
    operatingDays: string;
    description: string;
    commodities: string[];
  } | null>(null); // New state for selected market
  const [selectedMarketCommodity, setSelectedMarketCommodity] = useState<string>("All");
  interface Company {
    id: number;
    name: string;
    category: string;
    commodity: string[];
    officeAddress: string;
    contactPerson: string;
    phoneNumber: string;
    designation: string;
    emailWebsite: string;
    coordinates: number[];
    companyName?: string;
  }
  
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null); // New state for selected company

  const categories = ["All", ...new Set(companies.map((c) => c.category))];
  const commodityTypes = ["All", ...new Set(commodityPrices.map((c) => c.commodity))];

  const filteredCompanies =
    selectedCategory === "All"
      ? companies
      : companies.filter((c) => c.category === selectedCategory);

  const filteredCommodityPrices =
    selectedCommodity === "All"
      ? commodityPrices
      : commodityPrices.filter((c) => c.commodity === selectedCommodity);

  const filteredMarkets =
    selectedMarketCommodity === "All"
      ? markets
      : markets.filter((market) =>
          market.commodities.includes(selectedMarketCommodity)
        );

  useEffect(() => {
    if (displayMode === "temperature") {
      const fetchAllTemperatures = async () => {
        const tempData: { [key: string]: number | null } = {};
        for (const lga of lgas) {
          const temp = await getWeatherData(lga.coordinates[0], lga.coordinates[1]);
          tempData[lga.name] = temp;
        }
        setTemperatures(tempData);
      };
      fetchAllTemperatures();
    }
  }, [displayMode]);

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        selectedCommodity={selectedCommodity}
        setSelectedCommodity={setSelectedCommodity}
        commodityTypes={commodityTypes}
        selectedCrop={selectedCrop}
        setSelectedCrop={setSelectedCrop}
        selectedLgaCrops={selectedLgaCrops} // Pass selectedLgaCrops
        selectedMarket={selectedMarket} // Pass selectedMarket to Sidebar
        selectedMarketCommodity={selectedMarketCommodity} // Pass selectedMarketCommodity to Sidebar
        setSelectedMarketCommodity={setSelectedMarketCommodity} // Pass setter to Sidebar
        selectedCompany={selectedCompany} // Pass selectedCompany to Sidebar
      />
      {error && (
        <div className="absolute top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-[9999]" role="alert">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-[9999]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <p className="mt-2 text-gray-700">Loading data...</p>
        </div>
      )}
      <MapContainer
        center={[10.3764, 7.7095]}
        zoom={9}
        style={{ height: "100%", width: "85%" }}
        scrollWheelZoom={true}
        className="shadow-lg rounded-lg"
      >
        <LayersControl position="topright">
          {/* Street View Layer */}
          <LayersControl.BaseLayer checked name="Street View">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>

          {/* Satellite View Layer */}
          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
        </LayersControl>

        <AddKmlLayer />

        {/* Enable Irrigation Schemes Checkbox Only in Companies Mode */}
        {displayMode === "companies" && (
          <IrrigationSchemesToggleControl
            showIrrigationSchemes={showIrrigationSchemes}
            setShowIrrigationSchemes={setShowIrrigationSchemes}
          />
        )}

        {/* Render Irrigation Markers Only in Companies Mode */}
        {displayMode === "companies" &&
          showIrrigationSchemes &&
          irrigationSchemes.map((scheme, index) => (
            <Marker
              key={index}
              position={scheme.coordinates as [number, number]}
              icon={irrigationIcon}
              eventHandlers={{
                click: () => {
                  setSelectedIrrigationScheme({
                    name: scheme.name,
                    coordinates: scheme.coordinates as [number, number],
                  });
                },
              }}
            >
              <Popup>
                <h3 className="text-lg font-bold">{scheme.name}</h3>
                <p className="text-sm text-gray-700">
                  <strong>LGA:</strong> {scheme.lga}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Location:</strong> {scheme.location}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Size:</strong> {scheme.size}
                </p>
              </Popup>
            </Marker>
          ))}

        {/* Render Commodity Markers Only in Commodity Prices Mode */}
        {displayMode === "commodityPrices" &&
          filteredCommodityPrices.map((item) => {
            const lga = lgas.find((l) => l.name === item.lga);
            return (
              lga && (
                <Marker
                  key={`${item.lga}-${item.commodity}`}
                  position={lga.coordinates as [number, number]}
                  icon={customIcon} // Use a custom icon for commodities
                >
                  <Popup>
                    <h3 className="text-lg font-bold">{lga.name}</h3>
                    <p className="text-sm text-gray-700">
                      {item.commodity}:{" "}
                      <span className="font-bold">
                        ₦{item.price.toLocaleString()}
                      </span>
                    </p>
                  </Popup>
                </Marker>
              )
            );
          })}

        {/* Render Crop Markers Only in Crops Mode */}
        {displayMode === "crops" &&
          lgacrops
            .filter((lga) => selectedCrop === "All" || lga.crops.includes(selectedCrop))
            .map((lga) =>
              lga.crops.map((crop, index) => (
                <Marker
                  key={`${lga.lga}-${crop}-${index}`}
                  position={lga.coordinates as [number, number]}
                  icon={cropIcons[crop] || cropIcons.Default} // Use crop icon or default icon
                  eventHandlers={{
                    click: () => {
                      setSelectedLgaCrops({ lga: lga.lga, crops: lga.crops });
                    },
                  }}
                >
                  <Popup>
                    <h3 className="text-lg font-bold">{lga.lga}</h3>
                    <p className="text-sm text-gray-700">
                      <strong>Crop:</strong> {crop}
                    </p>
                  </Popup>
                </Marker>
              ))
            )}

        {/* Render Company Markers */}
        {displayMode === "companies" && (
          isClusteringEnabled ? (
            <MarkerClusterGroup
              showCoverageOnHover={false}
              chunkedLoading={true}
              maxClusterRadius={40}
              disableClusteringAtZoom={18}
              animate={true}
              iconCreateFunction={(cluster) => createClusterCustomIcon(cluster)}
            >
              {filteredCompanies.map((company) => (
                <Marker
                  key={company.id}
                  position={company.coordinates as [number, number]}
                  icon={categoryIcons[company.category] || categoryIcons.Default}
                  eventHandlers={{
                    click: () => setSelectedCompany(company),
                  }}
                >
                  <Tooltip
                    permanent
                    direction="top"
                    offset={[0, -20]}
                    className="bg-white text-black p-2"
                  >
                    <strong className="font-bold">{company.name}</strong>
                  </Tooltip>
                </Marker>
              ))}
            </MarkerClusterGroup>
          ) : (
            filteredCompanies.map((company) => (
              <Marker
                key={company.id}
                position={company.coordinates as [number, number]}
                icon={categoryIcons[company.category] || categoryIcons.Default}
                eventHandlers={{
                  click: () => setSelectedCompany(company),
                }}
              >
                <Tooltip
                  permanent
                  direction="top"
                  offset={[0, -20]}
                  className="bg-white text-black p-2"
                >
                  <strong className="font-bold">{company.name}</strong>
                </Tooltip>
              </Marker>
            ))
          )
        )}

        {/* Other Display Modes */}
        {displayMode === "temperature" &&
          lgas.map((lga) => (
            <Marker
              key={lga.name}
              position={lga.coordinates as [number, number]}
              icon={customIcon}
            >
              <Tooltip
                permanent
                direction="top"
                offset={[0, -20]}
                className="bg-white text-black p-2 rounded-md shadow"
              >
                <strong className="text-sm text-gray-700">
                  {temperatures[lga.name] !== null
                    ? `${temperatures[lga.name]}°C`
                    : "Loading..."}
                </strong>
                <p>{lga.name}</p>
              </Tooltip>
              <Popup>
                <h3 className="text-lg font-bold">{lga.name}</h3>
                <p className="text-sm text-gray-700">
                  Temperature:{" "}
                  {temperatures[lga.name] !== null
                    ? `${temperatures[lga.name]}°C`
                    : "Loading..."}
                </p>
              </Popup>
            </Marker>
          ))}

        {/* Render Market Markers Only in Markets Mode */}
        {displayMode === "markets" &&
          filteredMarkets.map((market, index) => (
            <Marker
              key={index}
              position={[market.latitude, market.longitude]}
              icon={marketIcon} // Use the custom market icon
              eventHandlers={{
                click: () => {
                  setSelectedMarket(market); // Set the selected market when marker is clicked
                },
              }}
            >
              <Tooltip
                    permanent
                    direction="top"
                    offset={[0, -20]}
                    className="bg-white text-black p-2"
                  >
                    <strong className="font-bold">{market.name}</strong>
                  </Tooltip>
              <Popup>
                <h3 className="text-lg font-bold">{market.name}</h3>
                <p className="text-sm text-gray-700">
                  <strong>LGA:</strong> {market.lga}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Operating Days:</strong> {market.operatingDays}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Description:</strong> {market.description}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Commodities:</strong> {market.commodities.join(", ")}
                </p>
              </Popup>
            </Marker>
          ))}

        <ClusteringToggleControl
          isClusteringEnabled={isClusteringEnabled}
          setIsClusteringEnabled={setIsClusteringEnabled}
        />

        {selectedCompany && <CenterMapOnClick position={selectedCompany.coordinates as [number, number]} />}
        {selectedIrrigationScheme && (
          <CenterMapOnClick position={selectedIrrigationScheme.coordinates} />
        )}
        {selectedMarket && (
          <CenterMapOnClick position={[selectedMarket.latitude, selectedMarket.longitude]} />
        )}
        {selectedMarket && (
          <div>Content</div>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;