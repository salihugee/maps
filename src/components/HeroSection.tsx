// filepath: c:\xampp\htdocs\agriculture_app\resources\js\components\HeroSection.tsx
import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <section className="bg-green-100 py-10">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-green-700 mb-4">
                    Welcome to the Agriculture App
                </h2>
                <p className="text-lg text-gray-700">
                    Your one-stop solution for farming tips, seasonal advice, and best practices.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;