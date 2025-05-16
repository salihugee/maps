import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  LayersControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import IrrigationSchemesToggleControl from "./IrrigationSchemes";
import CenterMapOnClick from "./CenterMapOnClick";

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
  temperatures: { [key: string]: number | null };
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
  cropIcons: { [key: string]: L.Icon };
  categoryIcons: { [key: string]: L.Icon };
  createClusterCustomIcon: (cluster: any) => L.DivIcon;
  setSelectedCompany: (company: any) => void;
  setSelectedMarket: (market: any) => void;
  setSelectedLgaCrops: (lgaCrops: any) => void;
  setSelectedIrrigationScheme: (scheme: any) => void;
}

const MapContainerComponent: React.FC<MapContainerProps> = ({
  displayMode,
  showIrrigationSchemes,
  setShowIrrigationSchemes,
  irrigationSchemes,
  filteredCommodityPrices,
  filteredMarkets,
  filteredCompanies,
  lgas,
  temperatures,
  selectedCrop,
  lgacrops,
  selectedCompany,
  selectedMarket,
  isClusteringEnabled,
  setIsClusteringEnabled,
  customIcon,
  irrigationIcon,
  marketIcon,
  cropIcons,
  categoryIcons,
  createClusterCustomIcon,
  setSelectedCompany,
  setSelectedMarket,
  setSelectedLgaCrops,
  setSelectedIrrigationScheme,
}) => {
  return (
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
            position={scheme.coordinates}
            icon={irrigationIcon}
            eventHandlers={{
              click: () => {
                setSelectedIrrigationScheme({
                  name: scheme.name,
                  coordinates: scheme.coordinates,
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

      {/* Render Company Markers */}
      {displayMode === "companies" && (
        isClusteringEnabled ? (
          <MarkerClusterGroup
            showCoverageOnHover={false}
            iconCreateFunction={createClusterCustomIcon}
          >
            {filteredCompanies.map((company) => (
              <Marker
                key={company.id}
                position={company.coordinates}
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
              position={company.coordinates}
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
          <Marker key={lga.name} position={lga.coordinates} icon={customIcon}>
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
          </Marker>
        ))}

      {/* Render Market Markers Only in Markets Mode */}
      {displayMode === "markets" &&
        filteredMarkets.map((market, index) => (
          <Marker
            key={index}
            position={[market.latitude, market.longitude]}
            icon={marketIcon}
            eventHandlers={{
              click: () => setSelectedMarket(market),
            }}
          >
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

      {selectedCompany && (
        <CenterMapOnClick position={selectedCompany.coordinates} />
      )}
      {selectedMarket && (
        <CenterMapOnClick
          position={[selectedMarket.latitude, selectedMarket.longitude]}
        />
      )}
    </MapContainer>
  );
};

export default MapContainerComponent;