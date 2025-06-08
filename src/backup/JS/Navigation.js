import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { createPortal } from 'react-dom';
const navLinkClass = ({ isActive }) => isActive
    ? 'bg-green-600 text-white px-3 py-2 rounded-md shadow-sm text-sm transition-all'
    : 'bg-gray-700 text-gray-300 px-3 py-2 rounded-md shadow-sm text-sm transition-all hover:bg-gray-600 hover:text-white';
const Dropdown = ({ title, name, links, activeDropdown, toggleDropdown, handleLinkClick, }) => {
    const isOpen = activeDropdown === name;
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const summaryId = `${name}-summary`;
    const menuId = `${name}-menu`;
    useEffect(() => {
        const onClickOutside = (e) => {
            if (isOpen &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target) &&
                menuRef.current &&
                !menuRef.current.contains(e.target)) {
                toggleDropdown(null);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', onClickOutside);
            return () => document.removeEventListener('mousedown', onClickOutside);
        }
    }, [isOpen, toggleDropdown]);
    const dropdownList = (_jsx("ul", { id: menuId, ref: menuRef, role: "menu", "aria-labelledby": summaryId, className: "bg-gray-800 rounded-md py-1 absolute left-0 mt-2 min-w-[220px] z-[9999] shadow-xl border border-gray-700 backdrop-blur-sm bg-opacity-95", children: links.map(l => (_jsx("li", { role: "none", className: "px-1", children: _jsx(NavLink, { to: l.to, className: ({ isActive }) => `block w-full px-3 py-2 rounded-md text-sm transition-all duration-200 ${isActive
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`, role: "menuitem", onClick: handleLinkClick, children: l.label }) }, l.to))) }));
    return (_jsxs("div", { className: "relative group", children: ["      ", _jsxs("button", { ref: buttonRef, id: summaryId, "aria-haspopup": "true", "aria-expanded": isOpen, "aria-controls": menuId, className: "flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 font-medium", onClick: (e) => {
                    e.stopPropagation();
                    toggleDropdown(name);
                }, onKeyDown: e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        toggleDropdown(name);
                    }
                }, children: [title, _jsx("svg", { className: `ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", width: 16, height: 16, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), "      ", isOpen && createPortal(_jsx("div", { className: "fixed inset-0 z-[9998]", children: buttonRef.current && (_jsx("div", { className: "absolute z-[9999]", style: {
                        top: buttonRef.current.getBoundingClientRect().bottom + window.scrollY,
                        left: buttonRef.current.getBoundingClientRect().left + window.scrollX,
                    }, children: dropdownList })) }), document.body)] }));
};
export const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        setActiveDropdown(null);
    };
    const handleLinkClick = () => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
    };
    const toggleDropdown = (name) => {
        setActiveDropdown(prev => (prev === name ? null : name));
    };
    return (_jsxs("nav", { className: "relative z-[9999]", children: [isMenuOpen && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-40", onClick: toggleMenu, "aria-hidden": "true" })), "      ", _jsxs("div", { className: "navbar bg-gray-800 shadow-sm flex justify-between items-center px-4 py-2 relative z-[9999]", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: "/kdsg-logo.png", alt: "KDSG Logo", className: "h-10" }), _jsx(NavLink, { to: "/", className: "btn btn-ghost normal-case text-xl text-green-700", children: "KD-MOA" })] }), _jsx("button", { className: "lg:hidden text-gray-700 focus:outline-none", "aria-label": "Toggle menu", "aria-expanded": isMenuOpen, onClick: toggleMenu, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16m-7 6h7" }) }) }), _jsxs("ul", { className: "hidden lg:flex menu menu-horizontal px-1 space-x-2 items-center", children: [_jsx("li", { children: _jsx(NavLink, { to: "/", className: navLinkClass, children: "Home" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/about", className: navLinkClass, children: "About" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/maps", className: navLinkClass, children: "GIS Dashboard" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/dashboard", className: navLinkClass, children: "Dashboard" }) }), _jsx(Dropdown, { title: "Farming Resources", name: "farmingResources", links: [
                                    { to: '/resources-training', label: 'Resources & Training' },
                                    { to: '/precision-farming', label: 'Precision Farming' },
                                    { to: '/seasonal-farming-tips', label: 'Seasonal Farming Tips' },
                                ], activeDropdown: activeDropdown, toggleDropdown: toggleDropdown, handleLinkClick: handleLinkClick }), _jsx(Dropdown, { title: "Market & Weather", name: "marketWeather", links: [
                                    { to: '/market', label: 'Market Information' },
                                    { to: '/weather', label: 'Weather Information' },
                                    { to: '/drone-imagery', label: 'Drone Imagery' },
                                ], activeDropdown: activeDropdown, toggleDropdown: toggleDropdown, handleLinkClick: handleLinkClick }), _jsx(Dropdown, { title: "Stakeholders & Experts", name: "stakeholdersExperts", links: [
                                    { to: '/experts', label: 'Agricultural Experts' },
                                    { to: '/stakeholders', label: 'Stakeholders' },
                                    { to: '/stakeholders-map', label: 'Stakeholders Map' },
                                ], activeDropdown: activeDropdown, toggleDropdown: toggleDropdown, handleLinkClick: handleLinkClick }), _jsx(Dropdown, { title: "Community & Support", name: "communitySupport", links: [
                                    { to: '/farmers-forum', label: 'Farmers Forum' },
                                    { to: '/faqs', label: 'FAQs' },
                                ], activeDropdown: activeDropdown, toggleDropdown: toggleDropdown, handleLinkClick: handleLinkClick })] })] }), _jsx("div", { className: `fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 z-50 lg:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`, "aria-hidden": !isMenuOpen, children: _jsxs("ul", { className: "menu menu-vertical px-4 py-6 space-y-4", children: [_jsx("li", { children: _jsx(NavLink, { to: "/", className: navLinkClass, onClick: handleLinkClick, children: "Home" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/about", className: navLinkClass, onClick: handleLinkClick, children: "About" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/maps", className: navLinkClass, onClick: handleLinkClick, children: "GIS Dashboard" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/dashboard", className: navLinkClass, onClick: handleLinkClick, children: "Dashboard" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/resources-training", className: navLinkClass, onClick: handleLinkClick, children: "Resources & Training" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/precision-farming", className: navLinkClass, onClick: handleLinkClick, children: "Precision Farming" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/seasonal-farming-tips", className: navLinkClass, onClick: handleLinkClick, children: "Seasonal Farming Tips" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/market", className: navLinkClass, onClick: handleLinkClick, children: "Market Information" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/weather", className: navLinkClass, onClick: handleLinkClick, children: "Weather Information" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/drone-imagery", className: navLinkClass, onClick: handleLinkClick, children: "Drone Imagery" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/experts", className: navLinkClass, onClick: handleLinkClick, children: "Agricultural Experts" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/stakeholders", className: navLinkClass, onClick: handleLinkClick, children: "Stakeholders" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/stakeholders-map", className: navLinkClass, onClick: handleLinkClick, children: "Stakeholders Map" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/farmers-forum", className: navLinkClass, onClick: handleLinkClick, children: "Farmers Forum" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/faqs", className: navLinkClass, onClick: handleLinkClick, children: "FAQs" }) })] }) })] }));
};
export default Navigation;
