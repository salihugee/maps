import React, { useState, useEffect, useMemo } from 'react';
import { Users, Phone, Mail, Link, Building2, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

// import {
//     id,
//     name,
//     category,
//     contact_person,
//     designation,
//     phone_number,
//     email_website,
//     office_address,
// } from 'lucide-react';

const Stakeholders = () => {
    const [stakeholders, setStakeholders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState(null);

    // Get unique stakeholder types for filter buttons
    const stakeholderTypes = useMemo(() => {
        if (!stakeholders || stakeholders.length === 0) return [];
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
                } else {
                    throw new Error('Unexpected API response format.');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message || 'An error occurred while fetching stakeholders.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter stakeholders based on search + category
    const filteredStakeholders = useMemo(() => {
        if (!stakeholders || stakeholders.length === 0) return [];

        return stakeholders.filter((stakeholder) => {
            const searchMatch =
                stakeholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stakeholder.contact_person.toLowerCase().includes(searchTerm.toLowerCase());

            const typeMatch = !selectedType || stakeholder.category === selectedType;

            return searchMatch && typeMatch;
        });
    }, [stakeholders, searchTerm, selectedType]);

    // Render filter buttons
    const renderFilterButton = (type, label) => (
        <Button
            key={type === null ? 'all' : type}
            variant={selectedType === type ? 'default' : 'outline'}
            onClick={() => setSelectedType(type)}
            className={cn(selectedType === type && 'bg-green-500 text-white hover:bg-green-600')}
        >
            {label}
        </Button>
    );

    return (
        <div className="container mx-auto p-4 text-green-700">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Stakeholders</h1>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                    type="text"
                    placeholder="Search stakeholders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 lg:w-1/3"
                />
                <div className="flex flex-wrap gap-2 text-gray-500">
                    {renderFilterButton(null, 'All')}
                    {stakeholderTypes.map((type) => renderFilterButton(type, type))}
                </div>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center items-center h-48" aria-live="polite" aria-busy="true">
                    <Loader2 className="animate-spin text-4xl text-gray-500" />
                </div>
            ) : error ? (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : filteredStakeholders.length === 0 ? (
                <p className="text-gray-500">No matching stakeholders found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStakeholders.map((stakeholder) => (
                        <Card
                            key={stakeholder.id}
                            className="transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Users className="h-6 w-6 text-indigo-500" />
                                <CardTitle className="text-lg font-bold text-gray-800">{stakeholder.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 font-medium">Category: {stakeholder.category}</p>
                                <p className="text-gray-600">Contact Person: {stakeholder.contact_person}</p>
                                <p className="text-gray-600">Designation: {stakeholder.designation}</p>
                                <div className="mt-4 space-y-1">
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Phone className="h-4 w-4" />
                                        {stakeholder.phone_number}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        {stakeholder.email_website}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Building2 className="h-4 w-4" />
                                        {stakeholder.office_address}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        Coordinates: {stakeholder.coordinates}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Stakeholders;
