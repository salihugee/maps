import React from 'react';

const WelcomeMessage = () => {
    return (
        <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
            role="alert"
        >
            <p className="font-bold">A Call to Action</p>
            <p>This is a platform for agricultural development.</p>
        </div>
    );
};

const Homepage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to the Agricultural Platform
            </h1>

            <WelcomeMessage />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* News Feed Section */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Latest News
                    </h2>
                    <ul className="list-disc list-inside text-gray-500">
                        <li>News Item 1</li>
                        <li>News Item 2</li>
                        <li>News Item 3</li>
                    </ul>
                </div>

                {/* Events Calendar Section */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Upcoming Events
                    </h2>
                    <ul className="list-disc list-inside text-gray-500">
                        <li>Event 1</li>
                        <li>Event 2</li>
                        <li>Event 3</li>
                    </ul>
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="bg-white rounded-lg shadow-md p-4 mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Quick Links
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a href="/seasonal-farming-tips" className="text-blue-500 hover:text-blue-700">
                        Seasonal Farming Tips
                    </a>
                    <a href="/precision-farming" className="text-blue-500 hover:text-blue-700">
                        Precision Farming
                    </a>
                    <a href="/market" className="text-blue-500 hover:text-blue-700">
                        Market Information
                    </a>
                    <a href="/weather" className="text-blue-500 hover:text-blue-700">
                        Weather Updates
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
