import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { fetchTemperature } from "./utils/weather";
import { lgas } from "./data/lgas";
import { companies, companyCategories } from "./data/companies";

// Custom marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map = () => {
  const [selectedLayer, setSelectedLayer] = useState<"companies" | "temperature">("companies");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [temperatures, setTemperatures] = useState<{ [key: string]: number | null }>({});

  useEffect(() => {
    if (selectedLayer === "temperature") {
      const fetchAllTemperatures = async () => {
        const tempData: { [key: string]: number | null } = {};
        for (const lga of lgas) {
          tempData[lga.name] = await fetchTemperature(lga.coordinates[0], lga.coordinates[1]);
        }
        setTemperatures(tempData);
      };
      fetchAllTemperatures();
    }
  }, [selectedLayer]);

  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === "All"
    ? companies
    : companies.filter((company) => company.category === selectedCategory);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-4 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg shadow-md transition-all ${
            selectedLayer === "companies" ? "bg-green-600 text-white" : "bg-white text-gray-700"
          }`}
          onClick={() => setSelectedLayer("companies")}
        >
          📌 Show Companies
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow-md transition-all ${
            selectedLayer === "temperature" ? "bg-green-600 text-white" : "bg-white text-gray-700"
          }`}
          onClick={() => setSelectedLayer("temperature")}
        >
          🌡 Show Temperature
        </button>
      </div>

      {/* Company Category Dropdown */}
      {selectedLayer === "companies" && (
        <div className="flex justify-center mb-4">
          <select
            className="p-2 border rounded-lg bg-white shadow-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {companyCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Map Component */}
      <MapContainer center={[10.5, 7.4]} zoom={7} style={{ height: "500px", width: "100%" }} className="rounded-lg shadow-md">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marker Clustering for Companies */}
        {selectedLayer === "companies" && (
          <MarkerClusterGroup>
            {filteredCompanies.map((company) => (
              <Marker key={company.id} position={company.coordinates} icon={customIcon}>
                <Popup>
                  <h3 className="text-lg font-bold">{company.name}</h3>
                  <p className="text-sm text-gray-700">Category: {company.category}</p>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        )}

        {/* Show Temperature Markers */}
        {selectedLayer === "temperature" &&
          lgas.map((lga) => (
            <Marker key={lga.name} position={lga.coordinates} icon={customIcon}>
              <Popup>
                <h3 className="text-lg font-bold">{lga.name}</h3>
                <p className="text-sm text-gray-700">
                  Temperature: {temperatures[lga.name] !== null ? `${temperatures[lga.name]}°C` : "Loading..."}
                </p>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
