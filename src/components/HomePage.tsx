import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import SeasonalFarmingTips from './SeasonalFarmingTips';
import About from './About';
import Stakeholders from './Stakeholders';
import MarketInformation from './MarketInformation';
import PrecisionFarming from './PrecisionFarming';
import WeatherInformation from './WeatherInformation';
import DroneImagery from './DroneImagery';
import AgriculturalExperts from './AgriculturalExperts';
import StakeholdersMap from './StakeholdersMap';
import FarmersForum from './FarmersForum';
import ResourcesAndTraining from './ResourcesTrainings';
import FAQs from './FAQCard';
import Footer from './Footer';
import NotFound from './NotFound';

const HomePage: React.FC = () => {
    const WelcomeComponent: React.FC = () => (
        <div>
            <h2 className="text-3xl font-bold mb-4">Welcome to the Agriculture App</h2>
            <p className="text-gray-700">
                Explore farming tips, best practices, and resources to improve your agricultural
                productivity.
            </p>
        </div>
    );

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                {/* Navigation Bar */}
                <Navigation />

                {/* Hero Section */}
                <HeroSection />

                {/* Main Content */}
                <main className="container mx-auto px-4 py-6">
                    <Routes>
                        <Route path="/" element={<WelcomeComponent />} />
                        <Route path="/tips" element={<SeasonalFarmingTips />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/stakeholders" element={<Stakeholders />} />
                        <Route path="/market" element={<MarketInformation />} />
                        <Route path="/precision-farming" element={<PrecisionFarming />} />
                        <Route path="/weather" element={<WeatherInformation />} />
                        <Route path="/drone-imagery" element={<DroneImagery />} />
                        <Route path="/experts" element={<AgriculturalExperts />} />
                        <Route path="/stakeholders-map" element={<StakeholdersMap />} />
                        <Route path="/farmers-forum" element={<FarmersForum />} />
                        <Route path="/resources-training" element={<ResourcesAndTraining />} />
                        <Route path="/faqs" element={<FAQs />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
};

export default HomePage;