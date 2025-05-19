import React from 'react';
import SeasonalFarmingTips from './SeasonalFarmingTips';

const DefaultPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-4 py-6">
                <SeasonalFarmingTips />
            </main>

            <footer className="bg-gray-800 text-white py-4 mt-6">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2025 Agriculture App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default DefaultPage;