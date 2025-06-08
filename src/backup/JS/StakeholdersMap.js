import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useMemo } from 'react';
import { Users, Phone, Mail, Link, Building2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const StakeholdersMap = () => {
    const [stakeholders, setStakeholders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    const mapRef = useRef(null);
    const [mapInstance, setMapInstance] = useState(null);
    // Filter unique stakeholder types dynamically
    const stakeholderTypes = useMemo(() => {
        if (!stakeholders || stakeholders.length === 0)
            return [];
        const types = [...new Set(stakeholders.map((s) => s.category))];
        return types;
    }, [stakeholders]);
    const filteredStakeholders = stakeholders.filter((stakeholder) => {
        const searchMatch = stakeholder.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stakeholder.contact_person?.toLowerCase().includes(searchTerm.toLowerCase());
        const typeMatch = !selectedType || stakeholder.category === selectedType;
        return searchMatch && typeMatch;
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/companies');
                if (!response.ok)
                    throw new Error('Failed to fetch stakeholders');
                const data = await response.json();
                setStakeholders(data);
            }
            catch (err) {
                setError('An error occurred while fetching stakeholders.');
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (mapRef.current && !mapInstance) {
            const newMap = L.map(mapRef.current).setView([10.3764, 7.7095], 8); // Nigeria
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(newMap);
            setMapInstance(newMap);
        }
        if (mapInstance) {
            mapInstance.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    mapInstance.removeLayer(layer);
                }
            });
            filteredStakeholders.forEach((s) => {
                if (s.coordinates) {
                    const marker = L.marker(s.coordinates).addTo(mapInstance);
                    marker.bindPopup(`
                        <b>${s.name}</b><br/>
                        Type: ${s.category}<br/>
                        Contact: ${s.contact_person}<br/>
                        <a href="${s.email_website}" target="_blank">${s.email_website}</a>
                    `);
                }
            });
        }
    }, [filteredStakeholders, mapInstance]);
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Stakeholders Map" }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6 text-green-700", children: [_jsx(Input, { type: "text", placeholder: "Search stakeholders...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full md:w-1/2 lg:w-1/3" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Button, { variant: selectedType === null ? 'default' : 'outline', onClick: () => setSelectedType(null), className: cn(selectedType === null && 'bg-green-500 text-white hover:bg-green-600'), children: "All" }), stakeholderTypes.map((type) => (_jsx(Button, { variant: selectedType === type ? 'default' : 'outline', onClick: () => setSelectedType(type), className: cn(selectedType === type && 'bg-green-500 text-white hover:bg-green-600'), children: type }, type)))] })] }), loading ? (_jsx("div", { className: "flex justify-center items-center h-48", children: _jsx(Loader2, { className: "animate-spin text-4xl text-gray-500" }) })) : error ? (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] })) : (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx("div", { className: "lg:h-[500px] rounded-lg shadow-lg", children: _jsx("div", { ref: mapRef, className: "w-full h-full rounded-lg", style: { minHeight: '300px' } }) }), _jsx("div", { children: filteredStakeholders.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No matching stakeholders found." })) : (filteredStakeholders.map((s) => (_jsxs(Card, { className: "mb-4 transition-transform transform hover:scale-105 hover:shadow-lg", children: [_jsxs(CardHeader, { className: "flex flex-row items-center gap-4 text-gray-700", children: [_jsx(Users, { className: "h-6 w-6 text-indigo-500" }), _jsx(CardTitle, { className: "text-lg font-semibold", children: s.name })] }), _jsxs(CardContent, { children: [_jsxs("p", { className: "text-gray-600 font-medium", children: ["Type: ", s.category] }), _jsxs("p", { className: "text-gray-600", children: ["Contact Person: ", s.contact_person] }), _jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(Phone, { className: "h-4 w-4" }), s.phone_number] }), _jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(Mail, { className: "h-4 w-4" }), s.email_website] }), _jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(Link, { className: "h-4 w-4" }), _jsx("a", { href: s.website, target: "_blank", rel: "noopener noreferrer", className: "text-blue-500 hover:underline", children: s.email_website })] }), _jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(Building2, { className: "h-4 w-4" }), s.office_address] })] })] }, s.id)))) })] }))] }));
};
export default StakeholdersMap;
