import React, { useState, useEffect } from 'react';
import { Map, Camera, Calendar, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

// Dummy data for drone imagery (replace with actual data)
const dummyDroneData = [
    {
        id: 1,
        location: 'Kaduna South',
        date: '2024-07-20',
        imageUrl: 'https://placehold.co/600x400/EEE/31343C',
        description: 'Overview of farmland in Kaduna South on July 20, 2024.',
        cameraType: 'RGB',
    },
    {
        id: 2,
        location: 'Zaria',
        date: '2024-07-15',
        imageUrl: 'https://placehold.co/600x400/EEE/31343C',
        description: 'Detailed view of crop health in Zaria on July 15, 2024.',
        cameraType: 'Multispectral',
    },
    {
        id: 3,
        location: 'Kafanchan',
        date: '2024-07-10',
        imageUrl: 'https://placehold.co/600x400/EEE/31343C',
        description: 'Assessment of irrigation infrastructure in Kafanchan.',
        cameraType: 'Thermal',
    },
    {
        id: 4,
        location: 'Kaduna North',
        date: '2024-08-01',
        imageUrl: 'https://placehold.co/600x400/EEE/31343C',
        description: 'Monitoring crop growth in Kaduna North.',
        cameraType: 'RGB',
    },
    {
        id: 5,
        location: 'Soba',
        date: '2024-07-28',
        imageUrl: 'https://placehold.co/600x400/EEE/31343C',
        description: 'Soil analysis using drone imagery in Soba.',
        cameraType: 'Hyperspectral',
    },
];

const DroneImagery = () => {
    const [droneData, setDroneData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchLocation, setSearchLocation] = useState('');

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
                setDroneData(dummyDroneData); // Use dummy data
            } catch (err) {
                setError('An error occurred while fetching drone imagery data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter drone data based on selected location and date
    const filteredData = droneData.filter((item) => {
        const locationMatch = !searchLocation || item.location.toLowerCase().includes(searchLocation.toLowerCase());
        const dateMatch =
            !selectedDate || format(parseISO(item.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
        return locationMatch && dateMatch;
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Drone Imagery</h1>

            {/* Location and Date Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                    type="text"
                    placeholder="Search by location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full md:w-1/2 lg:w-1/3"
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                'w-full md:w-1/2 lg:w-1/3 justify-start text-left font-normal',
                                !selectedDate && 'text-muted-foreground'
                            )}
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <CalendarUI
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date > new Date() || date < new Date('2024-01-01')}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
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
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : filteredData.length === 0 ? (
                <p className="text-gray-500">No drone imagery found for the selected location and date.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {filteredData.map((item) => (
                        <Card key={item.id} className="transition-transform transform hover:scale-105 hover:shadow-lg">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Camera className="h-6 w-6 text-purple-500" />
                                <CardTitle className="text-lg font-semibold">{item.location}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <img
                                    src={item.imageUrl}
                                    alt={`Drone imagery of ${item.location}`}
                                    className="w-full h-auto rounded-md mb-4"
                                />
                                <p className="text-sm text-gray-500 mb-2">
                                    <Calendar className="inline-block h-4 w-4 mr-1" />
                                    Date: {item.date}
                                </p>
                                <p className="text-sm text-gray-500 mb-2">Camera Type: {item.cameraType}</p>
                                <CardDescription className="text-gray-700">{item.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DroneImagery;
