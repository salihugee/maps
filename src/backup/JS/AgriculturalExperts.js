import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Users, Loader2, Phone, Mail, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// Dummy data for agricultural experts (replace with actual data)
const dummyExperts = [
    {
        id: 1,
        name: 'Dr. Ngozi Okonjo-Iweala',
        specialization: 'Agricultural Economics',
        bio: 'Dr. Okonjo-Iweala is a renowned economist with expertise in agricultural policy and development.',
        qualifications: 'PhD, Massachusetts Institute of Technology',
        contact: '+234 901 234 5678',
        email: 'ngozi.okonjo@example.com',
    },
    {
        id: 2,
        name: 'Prof. Akinwumi Adesina',
        specialization: 'Agronomy',
        bio: 'Prof. Adesina is an agronomist and agricultural development expert with a focus on improving crop yields and food security.',
        qualifications: 'PhD, Purdue University',
        contact: '+234 802 345 6789',
        email: 'akinwumi.adesina@example.com',
    },
    {
        id: 3,
        name: 'Dr. Umar Audu',
        specialization: 'Animal Science',
        bio: 'Dr. Audu is an animal scientist specializing in livestock production and management.',
        qualifications: 'PhD, University of Ibadan',
        contact: '+234 703 456 7890',
        email: 'umar.audu@example.com',
    },
    {
        id: 4,
        name: 'Hajia Fatima Mohammed',
        specialization: 'Agricultural Extension',
        bio: 'Hajia Mohammed is an expert in agricultural extension services, focused on disseminating knowledge to farmers.',
        qualifications: 'MSc, Ahmadu Bello University',
        contact: '+234 909 876 5432',
        email: 'fatima.mohammed@example.com',
    },
    {
        id: 5,
        name: 'Dr. Olufemi Taiwo',
        specialization: 'Soil Science',
        bio: 'Dr. Taiwo is a soil scientist with expertise in soil fertility management and conservation.',
        qualifications: 'PhD, Obafemi Awolowo University',
        contact: '+234 805 123 4567',
        email: 'olufemi.taiwo@example.com',
    },
];
const AgriculturalExperts = () => {
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
                setExperts(dummyExperts); // Use dummy data
            }
            catch (err) {
                setError('An error occurred while fetching agricultural experts.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const filteredExperts = experts.filter((expert) => expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.specialization.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { className: "container mx-auto p-4 text-gray-700", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Agricultural Experts" }), _jsx("div", { className: "mb-6", children: _jsx(Input, { type: "text", placeholder: "Search experts...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full md:w-1/2 lg:w-1/3" }) }), loading ? (_jsx("div", { className: "flex justify-center items-center h-48", "aria-live": "polite", "aria-busy": "true", children: _jsx(Loader2, { className: "animate-spin text-4xl text-gray-500" }) })) : error ? (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] })) : filteredExperts.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No matching experts found." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredExperts.map((expert) => (_jsxs(Card, { className: "transition-transform transform hover:scale-105 hover:shadow-lg", children: [_jsxs(CardHeader, { className: "flex flex-row items-center gap-4", children: [_jsx(Users, { className: "h-6 w-6 text-green-500" }), _jsx(CardTitle, { className: "text-lg font-semibold", children: expert.name })] }), _jsxs(CardContent, { children: [_jsxs("p", { className: "text-gray-600 font-medium", children: ["Specialization: ", expert.specialization] }), _jsx("p", { className: "text-gray-700 mt-2 line-clamp-3", children: expert.bio }), _jsxs("div", { className: "mt-4", children: [_jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(GraduationCap, { className: "h-4 w-4" }), expert.qualifications] }), _jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(Phone, { className: "h-4 w-4" }), expert.contact] }), _jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(Mail, { className: "h-4 w-4" }), expert.email] })] })] })] }, expert.id))) }))] }));
};
export default AgriculturalExperts;
