import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./pages/Map";
import CompaniesPage from "./CompaniesPage";
import Dashboard from "./pages/Dashboard";
import Navigation from "./components/Navigation";
import NotFound from "./components/NotFound";
import About from "./components/About";
import WelcomePage from "./components/WelcomePage";
import MarketInformation from "./components/MarketInformation";
import WeatherInformation from "./components/WeatherInformation";
import FAQCard from "./components/FAQCard";
import AgriculturalExpert from "./components/AgriculturalExperts";
import Stakeholders from "./components/Stakeholders";
import StakeholdersMap from "./components/StakeholdersMap";
const SeasonalFarmingTips = React.lazy(() => import('./components/SeasonalFarmingTips'));
const FarmersForum = React.lazy(() => import('./components/FarmersForum'));
// const DroneImagery = React.lazy(() => import('./components/DroneImagery'));
const PrecisionFarming = React.lazy(() => import('./components/PrecisionFarming'));
const ResourcesAndTraining = React.lazy(() => import('./components/ResourcesTrainings'));
function App() {
    return (_jsx(Router, { children: _jsxs("div", { className: "h-screen w-screen flex flex-col", children: [_jsx(Navigation, {}), _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(WelcomePage, {}) }), _jsx(Route, { path: "/maps", element: _jsx(Map, {}) }), _jsx(Route, { path: "/companies", element: _jsx(CompaniesPage, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/market", element: _jsx(MarketInformation, {}) }), _jsx(Route, { path: "/weather", element: _jsx(WeatherInformation, {}) }), _jsx(Route, { path: "/tips", element: _jsx(SeasonalFarmingTips, {}) }), _jsx(Route, { path: "/farmers-forum", element: _jsx(FarmersForum, {}) }), _jsx(Route, { path: "/faqs", element: _jsx(FAQCard, {}) }), _jsx(Route, { path: "/experts", element: _jsx(AgriculturalExpert, {}) }), _jsx(Route, { path: "/stakeholders", element: _jsx(Stakeholders, {}) }), _jsx(Route, { path: "/seasonal-farming-tips", element: _jsx(SeasonalFarmingTips, {}) }), _jsx(Route, { path: "/stakeholders-map", element: _jsx(StakeholdersMap, {}) }), _jsx(Route, { path: "/precision-farming", element: _jsx(PrecisionFarming, {}) }), _jsx(Route, { path: "/resources-training", element: _jsx(ResourcesAndTraining, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) })] }) }));
}
export default App;
