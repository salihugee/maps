import React from 'react';
import {
    MessageCircle, // For Forum
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, Variants } from 'framer-motion';

interface ForumTopic {
    id: number;
    title: string;
    author: string;
    date: string;
    comments: number;
}

// Animation variants
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

// Dummy data for resources - replace with your actual data source
const forumTopics: ForumTopic[] = [
    { id: 1, title: 'Best practices for maize cultivation', author: 'John Doe', date: '2024-07-28', comments: 15 },
    { id: 2, title: 'Managing poultry diseases in harmattan', author: 'Alice Smith', date: '2024-07-25', comments: 22 },
    { id: 3, title: 'Market prices for rice in Kano', author: 'Usman Bello', date: '2024-07-20', comments: 18 },
    { id: 4, title: 'Soil conservation techniques', author: 'Esther Williams', date: '2024-07-18', comments: 25 },
    { id: 5, title: 'Government agricultural policies', author: 'David Okoro', date: '2024-07-15', comments: 30 },
];

const FarmersForum: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
                <MessageCircle className="w-6 h-6" /> Farmer&apos;s Forum
            </h2>
            <p className="text-gray-700">
                Connect with other farmers, share your experiences, and learn from experts.
                Participate in discussions on various agricultural topics.
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
                {forumTopics.map((topic) => (
                    <motion.div key={topic.id} variants={cardVariants}>
                        <Card className="hover:shadow-lg transition-shadow border-green-200">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-green-700">{topic.title}</CardTitle>
                                <CardDescription className="text-green-800">
                                    By {topic.author} on {topic.date}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">Comments: {topic.comments}</p>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="mt-4 w-full bg-green-100/50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-300"
                                >
                                    <a href="#" aria-label={`View discussion on ${topic.title}`} className="w-full">
                                        View Discussion
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
                <a href="#" aria-label="See more forum discussions">
                    See More Forum Discussions
                </a>
            </Button>
        </div>
    );
};

export default FarmersForum;
