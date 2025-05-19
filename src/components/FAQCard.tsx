import React, { useState, useEffect } from 'react';
import { HelpCircle, Search, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Dummy data for FAQs (replace with actual data)
const dummyFAQs = [
    {
        id: 1,
        question: 'What is precision farming?',
        answer:
            'Precision farming is a farming management concept based on observing, measuring and responding to inter and intra-field variability in crops.',
        category: 'Farming',
    },
    {
        id: 2,
        question: 'How can I get farming tips?',
        answer:
            'You can find seasonal farming tips on our platform. We provide information on best practices for different crops and seasons.',
        category: 'Farming',
    },
    {
        id: 3,
        question: 'Where can I find market information?',
        answer:
            'Our platform provides up-to-date market prices and trends for various agricultural products.',
        category: 'Market',
    },
    {
        id: 4,
        question: 'How do I contact agricultural experts?',
        answer:
            'We have a directory of agricultural experts on our platform. You can find their profiles and contact information there.',
        category: 'Experts',
    },
    {
        id: 5,
        question: 'What weather information is available?',
        answer:
            'We provide current weather conditions, forecasts, and information on potential weather risks.',
        category: 'Weather',
    },
    {
        id: 6,
        question: 'How do I sell my products?',
        answer: 'You can connect with potential buyers through our platform.',
        category: 'Market',
    },
    {
        id: 7,
        question: 'How do I buy products from farmers?',
        answer: 'You can connect with sellers and farmers on our platform.',
        category: 'Market',
    },
    {
        id: 8,
        question: 'What kind of soil information do you provide?',
        answer: 'We offer information on soil testing, including pH levels, nutrient content, and texture.',
        category: 'Farming',
    },
];

const categories = [...new Set(dummyFAQs.map((faq) => faq.category))];

const FAQCard = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="mb-4 transition-all duration-300 text-gray-700">
            <CardHeader
                className="flex flex-row items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-500" />
                    {faq.question}
                </CardTitle>
                <Button
                    variant="ghost"
                    size="icon"
                    className="transition-transform duration-300"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card from also toggling
                        setIsOpen(!isOpen);
                    }}
                >
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>
            </CardHeader>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <CardContent>
                            <CardDescription>{faq.answer}</CardDescription>
                        </CardContent>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};

const FAQs = () => {
    const [faqs, setFAQs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
                setFAQs(dummyFAQs); // Use dummy data
                setLoading(false);
            } catch (err) {
                setError('An error occurred while fetching FAQs.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredFAQs = faqs.filter((faq) => {
        const searchMatch =
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = !selectedCategory || faq.category === selectedCategory;
        return searchMatch && categoryMatch;
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h1>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 text-green-700">
                <Input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 lg:w-1/3"
                />
                <div className="flex flex-wrap gap-2">
                    <span className="text-gray-700 font-medium">Filter by Category:</span>
                    <Button
                        variant={selectedCategory === null ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                            selectedCategory === null && 'bg-blue-500 text-white hover:bg-blue-600'
                        )}
                    >
                        All
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'outline'}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                selectedCategory === category && 'bg-blue-500 text-white hover:bg-blue-600'
                            )}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
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
            ) : filteredFAQs.length === 0 ? (
                <p className="text-gray-500">No matching FAQs found.</p>
            ) : (
                <div>
                    {filteredFAQs.map((faq) => (
                        <FAQCard key={faq.id} faq={faq} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FAQs;

