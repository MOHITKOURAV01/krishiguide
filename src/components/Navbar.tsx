import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  SunIcon, 
  MoonIcon, 
  MenuIcon, 
  XIcon,
} from '@heroicons/react/solid';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fix: Handle manual navigation with JavaScript
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = path;
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
    // Add a visual effect when toggling
    const button = document.querySelector('.dark-mode-toggle');
    if (button) {
      button.classList.add('animate-spin-once');
      setTimeout(() => {
        button.classList.remove('animate-spin-once');
      }, 500);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 bg-white dark:bg-gray-900 shadow-navbar backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90'
          : 'py-4 bg-transparent'
      } ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a 
              href="/" 
              className="flex items-center group"
              onClick={(e) => handleNavigation('/', e)}
            >
              <div className="h-11 w-11 mr-3 rounded-full overflow-hidden border-2 border-primary-500 border-opacity-70 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-opacity-100 group-hover:shadow-lg">
                <img
                  src="/images/pngggg.jpg"
                  alt="KrishiGuide Logo"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    target.src = '/images/mohit.jpg'; // Fallback to another available image
                  }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-400 dark:to-primary-300 text-transparent bg-clip-text">KrishiGuide</h1>
                <p className="text-xs opacity-70 font-medium">Your Farming Assistant</p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" isActive={location.pathname === '/'} onClick={(e) => handleNavigation('/', e)}>
              Home
            </NavLink>
            <NavLink to="/crop-recommendation" isActive={location.pathname === '/crop-recommendation'} onClick={(e) => handleNavigation('/crop-recommendation', e)}>
              Crop Recommendation
            </NavLink>
            <NavLink to="/weather" isActive={location.pathname === '/weather'} onClick={(e) => handleNavigation('/weather', e)}>
              Weather
            </NavLink>
            <NavLink to="/soil-analysis" isActive={location.pathname === '/soil-analysis'} onClick={(e) => handleNavigation('/soil-analysis', e)}>
              Soil Analysis
            </NavLink>
            <NavLink to="/maps" isActive={location.pathname === '/maps'} onClick={(e) => handleNavigation('/maps', e)}>
              Maps
            </NavLink>
            <NavLink to="/todo" isActive={location.pathname === '/todo'} onClick={(e) => handleNavigation('/todo', e)}>
              Tasks
            </NavLink>
            <NavLink to="/dashboard" isActive={location.pathname === '/dashboard'} onClick={(e) => handleNavigation('/dashboard', e)}>
              Dashboard
            </NavLink>
            <NavLink to="/about" isActive={location.pathname === '/about'} onClick={(e) => handleNavigation('/about', e)}>
              About
            </NavLink>
            <NavLink to="/contact" isActive={location.pathname === '/contact'} onClick={(e) => handleNavigation('/contact', e)}>
              Contact
            </NavLink>
            <NavLink to="/farmer-stories" isActive={location.pathname === '/farmer-stories'} onClick={(e) => handleNavigation('/farmer-stories', e)}>
              Farmer Stories
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={handleDarkModeToggle}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all dark-mode-toggle border border-gray-200 dark:border-gray-700 shadow-sm"
              aria-label={`Toggle Dark Mode, currently ${isDarkMode ? 'enabled' : 'disabled'}`}
            >
              <div className="transition-transform duration-500">
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5 text-yellow-500" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-700" />
                )}
              </div>
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="p-2.5 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-all shadow-sm"
                aria-label={`Toggle Menu, currently ${isMenuOpen ? 'open' : 'closed'}`}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 rounded-b-xl overflow-hidden absolute w-full mt-2 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" isActive={location.pathname === '/'} onClick={(e) => { setIsMenuOpen(false); handleNavigation('/', e); }}>
              Home
            </MobileNavLink>
            <MobileNavLink 
              to="/crop-recommendation" 
              isActive={location.pathname === '/crop-recommendation'} 
              onClick={(e) => { setIsMenuOpen(false); handleNavigation('/crop-recommendation', e); }}
            >
              Crop Recommendation
            </MobileNavLink>
            <MobileNavLink to="/weather" isActive={location.pathname === '/weather'} onClick={(e) => { setIsMenuOpen(false); handleNavigation('/weather', e); }}>
              Weather
            </MobileNavLink>
            <MobileNavLink to="/soil-analysis" isActive={location.pathname === '/soil-analysis'} onClick={(e) => { setIsMenuOpen(false); handleNavigation('/soil-analysis', e); }}>
              Soil Analysis
            </MobileNavLink>
            <MobileNavLink to="/maps" isActive={location.pathname === '/maps'} onClick={(e) => { setIsMenuOpen(false); handleNavigation('/maps', e); }}>
              Maps
            </MobileNavLink>
            <MobileNavLink to="/todo" isActive={location.pathname === '/todo'} onClick={(e) => { setIsMenuOpen(false); handleNavigation('/todo', e); }}>
              Tasks
            </MobileNavLink>
            <MobileNavLink to="/dashboard" isActive={location.pathname === '/dashboard'} onClick={(e) => { setIsMenuOpen(false); handleNavigation('/dashboard', e); }}>
              Dashboard
            </MobileNavLink>
            <MobileNavLink to="/about" isActive={location.pathname === '/about'} onClick={(e) => { setIsMenuOpen(false); handleNavigation('/about', e); }}>
              About
            </MobileNavLink>
            <MobileNavLink to="/contact" isActive={location.pathname === '/contact'} onClick={(e) => { setIsMenuOpen(false); handleNavigation('/contact', e); }}>
              Contact
            </MobileNavLink>
            <MobileNavLink 
              to="/farmer-stories" 
              isActive={location.pathname === '/farmer-stories'} 
              onClick={(e) => { setIsMenuOpen(false); handleNavigation('/farmer-stories', e); }}
            >
              Farmer Stories
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, children, onClick }) => {
  return (
    <a
      href={to}
      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive
          ? 'bg-primary-500 text-white shadow-sm hover:shadow-md hover:bg-primary-600'
          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400'
      }`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

interface MobileNavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, isActive, children, onClick }) => {
  return (
    <a
      href={to}
      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
        isActive
          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-l-4 border-primary-500'
          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-primary-600 dark:hover:text-primary-400 border-l-4 border-transparent'
      }`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Navbar; 