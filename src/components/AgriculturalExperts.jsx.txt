import React, { useState, useEffect } from 'react';
import { Users, Search, Loader2, Phone, Mail, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface Expert {
    id: number;
    name: string;
    specialization: string;
    bio: string;
    qualifications: string;
    contact: string;
    email: string;
}

// Dummy data for agricultural experts (replace with actual data)
const dummyExperts: Expert[] = [
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

const AgriculturalExperts: React.FC = () => {
    const [experts, setExperts] = useState<Expert[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
                setExperts(dummyExperts); // Use dummy data
            } catch (err) {
                setError('An error occurred while fetching agricultural experts.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredExperts = experts.filter((expert) =>
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 text-gray-700">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Agricultural Experts</h1>

            {/* Search Input */}
            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Search experts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 lg:w-1/3"
                />
            </div>

            {loading ? (
                <div
                    className="flex justify-center items-center h-48"
                    aria-live="polite"
                    aria-busy="true"
                >
                    <Loader2 className="animate-spin text-4xl text-gray-500" />
                </div>
            ) : error ? (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : filteredExperts.length === 0 ? (
                <p className="text-gray-500">No matching experts found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExperts.map((expert) => (
                        <Card key={expert.id} className="transition-transform transform hover:scale-105 hover:shadow-lg">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Users className="h-6 w-6 text-green-500" />
                                <CardTitle className="text-lg font-semibold">{expert.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 font-medium">Specialization: {expert.specialization}</p>
                                <p className="text-gray-700 mt-2 line-clamp-3">{expert.bio}</p>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <GraduationCap className="h-4 w-4" />
                                        {expert.qualifications}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Phone className="h-4 w-4" />
                                        {expert.contact}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        {expert.email}
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

export default AgriculturalExperts;
