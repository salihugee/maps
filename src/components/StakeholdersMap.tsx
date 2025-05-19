import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Users, Phone, Mail, Link, Building2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Stakeholder {
    id: number;
    name: string;
    category: string;
    contact_person: string;
    phone_number: string;
    email_website: string;
    office_address: string;
    website?: string;
    coordinates: [number, number];
}

const StakeholdersMap: React.FC = () => {
    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

    // Filter unique stakeholder types dynamically
    const stakeholderTypes = useMemo<string[]>(() => {
        if (!stakeholders || stakeholders.length === 0) return [];
        const types = [...new Set(stakeholders.map((s) => s.category))];
        return types;
    }, [stakeholders]);

    const filteredStakeholders = stakeholders.filter((stakeholder) => {
        const searchMatch =
            stakeholder.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stakeholder.contact_person?.toLowerCase().includes(searchTerm.toLowerCase());
        const typeMatch = !selectedType || stakeholder.category === selectedType;
        return searchMatch && typeMatch;
    });

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await fetch('http://localhost:5001/api/companies');
                if (!response.ok) throw new Error('Failed to fetch stakeholders');
                const data: Stakeholder[] = await response.json();
                setStakeholders(data);
            } catch (err) {
                setError('An error occurred while fetching stakeholders.');
                console.error(err);
            } finally {
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Stakeholders Map</h1>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 text-green-700">
                <Input
                    type="text"
                    placeholder="Search stakeholders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 lg:w-1/3"
                />
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={selectedType === null ? 'default' : 'outline'}
                        onClick={() => setSelectedType(null)}
                        className={cn(selectedType === null && 'bg-green-500 text-white hover:bg-green-600')}
                    >
                        All
                    </Button>
                    {stakeholderTypes.map((type) => (
                        <Button
                            key={type}
                            variant={selectedType === type ? 'default' : 'outline'}
                            onClick={() => setSelectedType(type)}
                            className={cn(selectedType === type && 'bg-green-500 text-white hover:bg-green-600')}
                        >
                            {type}
                        </Button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="animate-spin text-4xl text-gray-500" />
                </div>
            ) : error ? (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="lg:h-[500px] rounded-lg shadow-lg">
                        <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: '300px' }}></div>
                    </div>
                    <div>
                        {filteredStakeholders.length === 0 ? (
                            <p className="text-gray-500">No matching stakeholders found.</p>
                        ) : (
                            filteredStakeholders.map((s) => (
                                <Card key={s.id} className="mb-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4 text-gray-700">
                                        <Users className="h-6 w-6 text-indigo-500" />
                                        <CardTitle className="text-lg font-semibold">{s.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 font-medium">Type: {s.category}</p>
                                        <p className="text-gray-600">Contact Person: {s.contact_person}</p>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <Phone className="h-4 w-4" />
                                            {s.phone_number}
                                        </p>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <Mail className="h-4 w-4" />
                                            {s.email_website}
                                        </p>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <Link className="h-4 w-4" />
                                            <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                {s.email_website}
                                            </a>
                                        </p>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <Building2 className="h-4 w-4" />
                                            {s.office_address}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StakeholdersMap;
