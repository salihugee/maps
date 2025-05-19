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
import SeasonalFarmingTips from "./components/SeasonalFarmingTips";
const SeasonalFarmingTips = React.lazy(() => import('./components/SeasonalFarmingTips'));
const FarmersForum = React.lazy(() => import('./components/FarmersForum'));
// const DroneImagery = React.lazy(() => import('./components/DroneImagery'));
const PrecisionFarming = React.lazy(() => import('./components/PrecisionFarming'));
const ResourcesAndTraining = React.lazy(() => import('./components/ResourcesTrainings'));

function App() {
  return (
    <Router>
      <div className="h-screen w-screen flex flex-col">
        {/* Navigation Menu */}
        <Navigation />

        {/* Routes */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
          <Route path="/" element={<WelcomePage />} />
            <Route path="/maps" element={<Map />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/market" element={<MarketInformation />} />
            <Route path="/weather" element={<WeatherInformation />} />
            <Route path="/tips" element={<SeasonalFarmingTips />} />
            <Route path="/farmers-forum" element={<FarmersForum />} />
            {/* <Route path="/drone-imagery" element={<DroneImagery />} /> */}
            <Route path="/faqs" element={<FAQCard />} />
            <Route path="/experts" element={<AgriculturalExpert />} />
            <Route path="/stakeholders" element={<Stakeholders />} />
            <Route path="/seasonal-farming-tips" element={<SeasonalFarmingTips />} />
            <Route path="/stakeholders-map" element={<StakeholdersMap />} />
            <Route path="/precision-farming" element={<PrecisionFarming />} />
            <Route path="/resources-training" element={<ResourcesAndTraining />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
