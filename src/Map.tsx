import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import "./mapStyles.css";
import L from "leaflet";
import { companies } from "./data/companies";
import { lgas } from "./data/lgas";
import { fetchTemperature } from "./utils/weather";
import { commodityPrices } from "./data/commodity";

// Fix Leaflet marker issue in React
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCommodity, setSelectedCommodity] = useState("All");
  const [temperatures, setTemperatures] = useState<{ [key: string]: number | null }>({});
  const [displayMode, setDisplayMode] = useState("companies");

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

  useEffect(() => {
    if (displayMode === "temperature") {
      const fetchAllTemperatures = async () => {
        const tempData: { [key: string]: number } = {}; // Explicitly type tempData
        for (const lga of lgas) {
          tempData[lga.name] = await fetchTemperature(lga.coordinates[0], lga.coordinates[1]);
        }
        setTemperatures(tempData);
      };
      fetchAllTemperatures();
    }
  }, [displayMode]);

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2 font-semibold">Display Mode:</label>
        <button
          className={`px-4 py-2 rounded-lg shadow-md transition-all ${displayMode === "companies" ? "bg-green-600 text-white" : "bg-white text-gray-700"}`}
          onClick={() => setDisplayMode("companies")}
        >📌 Companies</button>
        <button
          className={`px-4 py-2 rounded-lg shadow-md transition-all ml-2 ${displayMode === "temperature" ? "bg-green-600 text-white" : "bg-white text-gray-700"}`}
          onClick={() => setDisplayMode("temperature")}
        >🌡 Temperature</button>
        <button
          className={`px-4 py-2 rounded-lg shadow-md transition-all ml-2 ${displayMode === "commodityPrices" ? "bg-green-600 text-white" : "bg-white text-gray-700"}`}
          onClick={() => setDisplayMode("commodityPrices")}
        >📊 Commodity Prices</button>
      </div>

      {displayMode === "companies" && (
        <div className="mb-4">
          <label className="mr-2 font-semibold">Filter by Category:</label>
          <select className="border rounded p-2" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      )}

      {displayMode === "commodityPrices" && (
        <div className="mb-4">
          <label className="mr-2 font-semibold">Filter by Commodity:</label>
          <select className="border rounded p-2" value={selectedCommodity} onChange={(e) => setSelectedCommodity(e.target.value)}>
            {commodityTypes.map((commodity) => (
              <option key={commodity} value={commodity}>{commodity}</option>
            ))}
          </select>
        </div>
      )}

      <MapContainer center={[10.5, 7.4]} zoom={7} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {displayMode === "companies" &&
          filteredCompanies.map((company) => (
            <Marker key={company.id} position={[company.coordinates[0], company.coordinates[1]] as [number, number]} icon={customIcon}>
              <Tooltip permanent direction="top" offset={[0, -20]} className="bg-white text-black p-1 rounded-md shadow">{company.name}</Tooltip>
              <Popup>
                <h3 className="text-lg font-bold">{company.name}</h3>
                <p className="text-sm text-gray-700">Category: {company.category}</p>
                <p className="text-sm text-gray-700">Category: {company.category}</p>
                <p className="text-sm text-gray-700">Category: {company.category}</p>
                <p className="text-sm text-gray-700">Category: {company.category}</p>
              
              </Popup>
            </Marker>
          ))}

        {displayMode === "temperature" &&
          lgas.map((lga) => (
            <Marker key={lga.name} position={lga.coordinates as [number, number]} icon={customIcon}>
              <Popup>
                <h3 className="text-lg font-bold">{lga.name}</h3>
                <p className="text-sm text-gray-700">Temperature: {temperatures[lga.name] !== null ? `${temperatures[lga.name]}°C` : "Loading..."}</p>
              </Popup>
            </Marker>
          ))}

        {displayMode === "commodityPrices" &&
          filteredCommodityPrices.map((item) => {
            const lga = lgas.find((l) => l.name === item.lga);
            return (
              lga && (
                <Marker key={`${item.lga}-${item.commodity}`} position={lga.coordinates as [number, number]} icon={customIcon}>
                  <Popup>
                    <h3 className="text-lg font-bold">{lga.name}</h3>
                    <p className="text-sm text-gray-700">{item.commodity}: <span className="font-bold">₦{item.price.toLocaleString()}</span></p>
                  </Popup>
                </Marker>
              )
            );
          })}
      </MapContainer>
    </div>
  );
};

export default Map;
