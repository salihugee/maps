import React from 'react';
import SeasonalFarmingTips from './SeasonalFarmingTips';

const DefaultPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* <header className="bg-green-600 text-white py-4">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">Agriculture App</h1>
                </div>
            </header> */}

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