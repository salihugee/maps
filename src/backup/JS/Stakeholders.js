import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { Users, Phone, Mail, Link, Building2, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { cn } from '../lib/utils';
const Stakeholders = () => {
    const [stakeholders, setStakeholders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    // Get unique stakeholder types for filter buttons
    const stakeholderTypes = useMemo(() => {
        if (!stakeholders || stakeholders.length === 0)
            return [];
        const types = [...new Set(stakeholders.map((s) => s.category))];
        return types;
    }, [stakeholders]);
    // Fetch stakeholders from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/companies');
                if (!response.ok) {
                    throw new Error(`Failed to fetch stakeholders: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched stakeholders:', data);
                if (Array.isArray(data)) {
                    setStakeholders(data);
                }
                else {
                    throw new Error('Unexpected API response format.');
                }
            }
            catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'An error occurred while fetching stakeholders.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    // Filter stakeholders based on search + category
    const filteredStakeholders = useMemo(() => {
        if (!stakeholders || stakeholders.length === 0)
            return [];
        return stakeholders.filter((stakeholder) => {
            const searchMatch = stakeholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stakeholder.contact_person.toLowerCase().includes(searchTerm.toLowerCase());
            const typeMatch = !selectedType || stakeholder.category === selectedType;
            return searchMatch && typeMatch;
        });
    }, [stakeholders, searchTerm, selectedType]);
    // Render filter buttons
    const renderFilterButton = (type, label) => (_jsx(Button, { variant: selectedType === type ? 'default' : 'outline', onClick: () => setSelectedType(type), className: cn(selectedType === type && 'bg-green-500 text-white hover:bg-green-600'), children: label }, type === null ? 'all' : type));
    return (_jsxs("div", { className: "container mx-auto p-4 text-green-700", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Stakeholders" }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [_jsx(Input, { type: "text", placeholder: "Search stakeholders...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full md:w-1/2 lg:w-1/3" }), _jsxs("div", { className: "flex flex-wrap gap-2 text-gray-500", children: [renderFilterButton(null, 'All'), stakeholderTypes.map((type) => renderFilterButton(type, type))] })] }), loading ? (_jsx("div", { className: "flex justify-center items-center h-48", "aria-live": "polite", "aria-busy": "true", children: _jsx(Loader2, { className: "animate-spin text-4xl text-gray-500" }) })) : error ? (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] })) : filteredStakeholders.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No matching stakeholders found." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredStakeholders.map((stakeholder) => (_jsxs(Card, { className: "transition-transform transform hover:scale-105 hover:shadow-lg", children: [_jsxs(CardHeader, { className: "flex flex-row items-center gap-4", children: [_jsx(Users, { className: "h-6 w-6 text-indigo-500" }), _jsx(CardTitle, { className: "text-lg font-bold text-gray-800", children: stakeholder.name })] }), _jsxs(CardContent, { children: [_jsxs("p", { className: "text-gray-600 font-medium", children: ["Category: ", stakeholder.category] }), _jsxs("p", { className: "text-gray-600", children: ["Contact Person: ", stakeholder.contact_person] }), _jsxs("p", { className: "text-gray-600", children: ["Designation: ", stakeholder.designation] }), _jsxs("div", { className: "mt-4 space-y-1", children: [_jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(Phone, { className: "h-4 w-4" }), stakeholder.phone_number] }), _jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(Mail, { className: "h-4 w-4" }), stakeholder.email_website] }), _jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(Link, { className: "h-4 w-4" }), stakeholder.email_website] }), _jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(Building2, { className: "h-4 w-4" }), stakeholder.office_address] }), _jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: ["Coordinates: ", stakeholder.coordinates] })] })] })] }, stakeholder.id))) }))] }));
};
export default Stakeholders;
