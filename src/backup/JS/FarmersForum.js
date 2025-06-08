import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MessageCircle, // For Forum
 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
// Animation variants
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};
// Dummy data for resources - replace with your actual data source
const forumTopics = [
    { id: 1, title: 'Best practices for maize cultivation', author: 'John Doe', date: '2024-07-28', comments: 15 },
    { id: 2, title: 'Managing poultry diseases in harmattan', author: 'Alice Smith', date: '2024-07-25', comments: 22 },
    { id: 3, title: 'Market prices for rice in Kano', author: 'Usman Bello', date: '2024-07-20', comments: 18 },
    { id: 4, title: 'Soil conservation techniques', author: 'Esther Williams', date: '2024-07-18', comments: 25 },
    { id: 5, title: 'Government agricultural policies', author: 'David Okoro', date: '2024-07-15', comments: 30 },
];
const FarmersForum = () => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("h2", { className: "text-2xl font-bold text-green-600 flex items-center gap-2", children: [_jsx(MessageCircle, { className: "w-6 h-6" }), " Farmer's Forum"] }), _jsx("p", { className: "text-gray-700", children: "Connect with other farmers, share your experiences, and learn from experts. Participate in discussions on various agricultural topics." }), _jsx(motion.div, { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", initial: "hidden", animate: "visible", variants: {
                    visible: {
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }, children: forumTopics.map((topic) => (_jsx(motion.div, { variants: cardVariants, children: _jsxs(Card, { className: "hover:shadow-lg transition-shadow border-green-200", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg font-semibold text-green-700", children: topic.title }), _jsxs(CardDescription, { className: "text-green-800", children: ["By ", topic.author, " on ", topic.date] })] }), _jsxs(CardContent, { children: [_jsxs("p", { className: "text-gray-600", children: ["Comments: ", topic.comments] }), _jsx(Button, { asChild: true, variant: "outline", className: "mt-4 w-full bg-green-100/50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-300", children: _jsx("a", { href: "#", "aria-label": `View discussion on ${topic.title}`, className: "w-full", children: "View Discussion" }) })] })] }) }, topic.id))) }), _jsx(Button, { asChild: true, className: "mt-6 bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300", children: _jsx("a", { href: "#", "aria-label": "See more forum discussions", children: "See More Forum Discussions" }) })] }));
};
export default FarmersForum;
