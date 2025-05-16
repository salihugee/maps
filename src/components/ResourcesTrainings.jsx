import React from 'react';
import {
    BookOpen,
    Users,
    Podcast,
    Newspaper,
    FileText,
    Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Animation variants
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

// Dummy data for training resources
const trainingResources = [
    {
        id: 1,
        type: 'PDF',
        title: 'Smallholder Farmers Handbook',
        description: 'A comprehensive guide for smallholder farmers.',
        url: '#', // Replace with actual URL
        icon: FileText,
    },
    {
        id: 2,
        type: 'Video',
        title: 'Poultry Farming Best Practices',
        description: 'Learn the best methods for raising healthy and productive poultry.',
        url: '#', // Replace with actual URL
        icon: Video,
    },
    {
        id: 3,
        type: 'Podcast',
        title: 'The Future of Farming in Nigeria',
        description: 'Discussions on modern farming techniques and sustainability.',
        url: '#', // Replace with actual URL
        icon: Podcast,
    },
    {
        id: 4,
        type: 'Article',
        title: 'Accessing Agricultural Loans',
        description: 'Information on how farmers can access financial support.',
        url: '#', // Replace with actual URL
        icon: Newspaper,
    },
    {
        id: 5,
        type: 'Training',
        title: 'Modern Beekeeping Techniques',
        description: 'Learn about modern methods of beekeeping for increased yield.',
        url: '#',
        icon: Users,
    },
];

const ResourcesAndTraining = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
                <BookOpen className="w-6 h-6" /> Resources & Training
            </h2>
            <p className="text-gray-700">
                Access a variety of resources to improve your farming practices and increase your yield. Find training materials, guides, and expert advice.
            </p>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >
                {trainingResources.map((resource) => (
                    <motion.div key={resource.id} variants={cardVariants}>
                        <Card className="hover:shadow-lg transition-shadow border-green-200 group">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div
                                    className={cn(
                                        'w-10 h-10 rounded-full flex items-center justify-center',
                                        'bg-green-100 text-green-600',
                                        'transition-all duration-300 group-hover:scale-110'
                                    )}
                                >
                                    <resource.icon className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-lg font-semibold text-green-700">{resource.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">{resource.description}</CardDescription>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="mt-4 w-full bg-green-100/50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-300"
                                >
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${resource.type}`}>
                                        View {resource.type}
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
            <Button
                asChild
                className="mt-6 bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300"
            >
                <a href="#" aria-label="See more resources">
                    See More Resources
                </a>
            </Button>
        </div>
    );
};

export default ResourcesAndTraining;
