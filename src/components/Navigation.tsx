import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { createPortal } from 'react-dom';

interface NavLinkClassProps { isActive: boolean; }
const navLinkClass = ({ isActive }: NavLinkClassProps): string =>
  isActive
    ? 'bg-green-600 text-white px-3 py-2 rounded-md shadow-sm text-sm transition-all'
    : 'bg-gray-700 text-gray-300 px-3 py-2 rounded-md shadow-sm text-sm transition-all hover:bg-gray-600 hover:text-white';

type DropdownType = 'farmingResources' | 'marketWeather' | 'stakeholdersExperts' | 'communitySupport' | null;

interface DropdownLink { to: string; label: string; }
interface DropdownProps {
  title: string;
  name: DropdownType;
  links: DropdownLink[];
  activeDropdown: DropdownType;
  toggleDropdown: (name: DropdownType) => void;
  handleLinkClick: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  name,
  links,
  activeDropdown,
  toggleDropdown,
  handleLinkClick,
}) => {
  const isOpen = activeDropdown === name;
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const summaryId = `${name}-summary`;
  const menuId = `${name}-menu`;
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (isOpen && 
          buttonRef.current && 
          !buttonRef.current.contains(e.target as Node) && 
          menuRef.current && 
          !menuRef.current.contains(e.target as Node)) {
        toggleDropdown(null);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', onClickOutside);
      return () => document.removeEventListener('mousedown', onClickOutside);
    }
  }, [isOpen, toggleDropdown]);

  const dropdownList = (
    <ul      id={menuId}
      ref={menuRef}
      role="menu"
      aria-labelledby={summaryId}
      className="bg-gray-800 rounded-md py-1 absolute left-0 mt-2 min-w-[220px] z-[9999] shadow-xl border border-gray-700 backdrop-blur-sm bg-opacity-95"
    >
      {links.map(l => (        <li key={l.to} role="none" className="px-1">
          <NavLink
            to={l.to}
            className={({ isActive }) =>
              `block w-full px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            role="menuitem"
            onClick={handleLinkClick}
          >
            {l.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative group">      <button
        ref={buttonRef}
        id={summaryId}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={menuId}
        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 font-medium"
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown(name);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleDropdown(name);
          }
        }}
      >
        {title}
        <svg
          className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width={16}
          height={16}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>      {isOpen && createPortal(
        <div className="fixed inset-0 z-[9998]">
          {buttonRef.current && (
            <div 
              className="absolute z-[9999]"
              style={{
                top: buttonRef.current.getBoundingClientRect().bottom + window.scrollY,
                left: buttonRef.current.getBoundingClientRect().left + window.scrollX,
              }}
            >
              {dropdownList}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);

  const toggleMenu = (): void => {
    setIsMenuOpen(prev => !prev);
    setActiveDropdown(null);
  };

  const handleLinkClick = (): void => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name: DropdownType): void => {
    setActiveDropdown(prev => (prev === name ? null : name));
  };

  return (
    <nav className="relative z-[9999]">
      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}      {/* Navbar */}
      <div className="navbar bg-gray-800 shadow-sm flex justify-between items-center px-4 py-2 relative z-[9999]">
        <div className="flex items-center gap-2">
          <img src="/kdsg-logo.png" alt="KDSG Logo" className="h-10" />
          <NavLink to="/" className="btn btn-ghost normal-case text-xl text-green-700">
            KD-MOA
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Desktop Links */}
        <ul className="hidden lg:flex menu menu-horizontal px-1 space-x-2 items-center">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
          <li><NavLink to="/maps" className={navLinkClass}>GIS Dashboard</NavLink></li>
          <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>

          <Dropdown
            title="Farming Resources"
            name="farmingResources"
            links={[
              { to: '/resources-training', label: 'Resources & Training' },
              { to: '/precision-farming', label: 'Precision Farming' },
              { to: '/seasonal-farming-tips', label: 'Seasonal Farming Tips' },
            ]}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            handleLinkClick={handleLinkClick}
          />

          <Dropdown
            title="Market & Weather"
            name="marketWeather"
            links={[
              { to: '/market', label: 'Market Information' },
              { to: '/weather', label: 'Weather Information' },
              { to: '/drone-imagery', label: 'Drone Imagery' },
            ]}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            handleLinkClick={handleLinkClick}
          />

          <Dropdown
            title="Stakeholders & Experts"
            name="stakeholdersExperts"
            links={[
              { to: '/experts', label: 'Agricultural Experts' },
              { to: '/stakeholders', label: 'Stakeholders' },
              { to: '/stakeholders-map', label: 'Stakeholders Map' },
            ]}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            handleLinkClick={handleLinkClick}
          />

          <Dropdown
            title="Community & Support"
            name="communitySupport"
            links={[
              { to: '/farmers-forum', label: 'Farmers Forum' },
              { to: '/faqs', label: 'FAQs' },
            ]}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            handleLinkClick={handleLinkClick}
          />
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 z-50 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="menu menu-vertical px-4 py-6 space-y-4">
          {/* Navigation Links */}
          <li><NavLink to="/" className={navLinkClass} onClick={handleLinkClick}>Home</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass} onClick={handleLinkClick}>About</NavLink></li>
          <li><NavLink to="/maps" className={navLinkClass} onClick={handleLinkClick}>GIS Dashboard</NavLink></li>
          <li><NavLink to="/dashboard" className={navLinkClass} onClick={handleLinkClick}>Dashboard</NavLink></li>

          {/* Farming Resources */}
          <li><NavLink to="/resources-training" className={navLinkClass} onClick={handleLinkClick}>Resources & Training</NavLink></li>
          <li><NavLink to="/precision-farming" className={navLinkClass} onClick={handleLinkClick}>Precision Farming</NavLink></li>
          <li><NavLink to="/seasonal-farming-tips" className={navLinkClass} onClick={handleLinkClick}>Seasonal Farming Tips</NavLink></li>

          {/* Market & Weather */}
          <li><NavLink to="/market" className={navLinkClass} onClick={handleLinkClick}>Market Information</NavLink></li>
          <li><NavLink to="/weather" className={navLinkClass} onClick={handleLinkClick}>Weather Information</NavLink></li>
          <li><NavLink to="/drone-imagery" className={navLinkClass} onClick={handleLinkClick}>Drone Imagery</NavLink></li>

          {/* Stakeholders & Experts */}
          <li><NavLink to="/experts" className={navLinkClass} onClick={handleLinkClick}>Agricultural Experts</NavLink></li>
          <li><NavLink to="/stakeholders" className={navLinkClass} onClick={handleLinkClick}>Stakeholders</NavLink></li>
          <li><NavLink to="/stakeholders-map" className={navLinkClass} onClick={handleLinkClick}>Stakeholders Map</NavLink></li>

          {/* Community & Support */}
          <li><NavLink to="/farmers-forum" className={navLinkClass} onClick={handleLinkClick}>Farmers Forum</NavLink></li>
          <li><NavLink to="/faqs" className={navLinkClass} onClick={handleLinkClick}>FAQs</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};
export default Navigation;