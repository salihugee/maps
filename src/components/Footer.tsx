// filepath: c:\xampp\htdocs\agriculture_app\resources\js\components\Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; 2025 Agriculture App. All rights reserved.</p>
                <p>
                    <a href="/contact" className="hover:underline">
                        Contact Us
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;